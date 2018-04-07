class AuthorsController < ApplicationController
  def index
    render(
      status: 200,
      json: Author.all
    )
  end
end
