class BooksController < ApplicationController
  def index
    render(
      status: 200,
      json: self.get_authenticated_user.books
    )
  end

  def create
    new_book = self.get_authenticated_user.books.create(JSON.parse request.body.read)
    render(
      status: 200,
      json: new_book
    )
  end

  def remove
    self.get_authenticated_user.books.destroy(params[:id])
    render status: 200
  end

  def edit
    book = self.get_authenticated_user.books.find(params[:id])
    updates = JSON.parse request.body.read
    book.update(updates)

    # TODO if reps are in updates (manual update), don't app_reps
    ApplicationController.change_reps(book)

    render(
      status: 200,
      json: book
    )
  end
end
