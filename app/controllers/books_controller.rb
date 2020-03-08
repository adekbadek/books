class BooksController < ApplicationController
  def index
    render(
      status: 200,
      json: serialize_books(self.get_authenticated_user.books)
    )
  end

  def show
    found_book = self.get_authenticated_user.books.find(params[:id])
    render(
      status: 200,
      json: {
        book: serialize_books([found_book])[0]
      }
    )
  end

  def create
    new_book = self.get_authenticated_user.books.create(JSON.parse request.body.read)
    render(
      status: 200,
      json: serialize_books([new_book]).first
    )
  end

  def remove
    self.get_authenticated_user.books.destroy(params[:id])
    render(
      status: 200,
      json: {id: params[:id]}
    )
  end

  def edit
    book = self.get_authenticated_user.books.find(params[:id])
    updates = JSON.parse request.body.read

    book.update(updates.except('reps', 'author_name'))

    # update all reps (end_date might have been set)
    if updates.key?('end_date')
      ApplicationController.change_reps(book)
    end

    # then override reps if in updates
    if updates.key?('reps')
      reps = updates['reps']
      3.times do |i|
        book["rep_#{i}"] = (reps.is_a? Array) ? reps[i] : nil
      end
      book.save!
    end

    if updates.key?('author_name')
      if book.author_id
        removed_author = Author.find(book.author_id)
      end

      if updates['author_name'] == ''
        book.update(author_id: nil)
      else
        assigned_author = Author.find_or_create_by(name: updates['author_name'])
        book.update(author_id: assigned_author.id)
      end

      if book.author_id
        if removed_author.books.length === 0
          removed_author.destroy()
        end
      end
    end

    render(
      status: 200,
      json: serialize_books([book]).first
    )
  end

  private

  def serialize_books(books)
    ApplicationController.serialize_books(books)
  end
end
