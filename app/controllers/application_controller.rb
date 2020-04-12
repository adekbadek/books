class ApplicationController < ActionController::API
  before_action :get_authenticated_user
  attr_reader :current_user

  def self.serialize_books(books)
    books.map{|book|
      book = book.as_json
      serialized_book = book.except('user_id', 'updated_at', 'created_at', 'author_id')
      serialized_book[:author_name] = book['author_id'] && Author.find(book['author_id']).name
      serialized_book
    }
  end

  def get_authenticated_user
    @current_user = AuthorizeApiRequest.call(request.headers).result
    @current_user || (render json: { error: 'Not Authorized' }, status: 401)
  end
end
