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
    user = self.get_authenticated_user
    book = user.books.find(params[:id])
    updates = JSON.parse request.body.read

    book.update(updates.except('author_name'))

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

    if updates.key?('end_date') && updates['end_date']
      due_date = Date.today + 14.days
      existing_prepare_notes_todo = book.todos.find{|todo| !todo.is_completed && todo.action == 'prepare_notes'}

      if existing_prepare_notes_todo
        existing_prepare_notes_todo.update(due_date: due_date)
      else
        Todo.create(
          user: user,
          book: book,
          action: 'prepare_notes',
          due_date: due_date
        )
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
