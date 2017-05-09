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
    new_book = JSON.parse request.body.read
    Book.create(new_book)

    render(
      status: 200,
      json: new_book
    )
  end
end
