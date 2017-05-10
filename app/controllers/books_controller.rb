class BooksController < ApplicationController
  def index
    q = params[:q]

    if q.blank?
      render(
        status: 200,
        json: Book.all
      )
    else
      render(
        status: 200,
        json: Book.where(["title LIKE ?", "%#{q}%"]).limit(100)
      )
    end
  end

  def create
    new_book = Book.create(JSON.parse request.body.read)
    render(
      status: 200,
      json: new_book
    )
  end

  def remove
    Book.destroy(params[:id])
    render status: 200
  end

  def edit
    book = Book.find(params[:id])
    updates = JSON.parse request.body.read
    book.update(updates)

    # TODO if reps are in updates (manual update), don't app_reps
    if book.end_date
      ApplicationController.add_reps(book)
    end

    render status: 200
  end
end
