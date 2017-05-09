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
    Book.create(JSON.parse request.body.read)
    render status: 200
  end

  def remove
    Book.destroy(params[:id])
    render status: 200
  end

  def edit
    Book.update(params[:id], (JSON.parse request.body.read))
    render status: 200
  end
end
