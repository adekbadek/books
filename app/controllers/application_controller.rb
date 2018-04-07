class ApplicationController < ActionController::API
  before_action :get_authenticated_user
  attr_reader :current_user

  def self.serialize_books(books)
    rep_keys = %w[rep_0 rep_1 rep_2]

    books.map{|book|
      book = book.as_json
      reps = book.slice(*rep_keys)
      serialized_book = book.except(*rep_keys, 'user_id', 'updated_at', 'created_at', 'author_id')
      serialized_book[:reps] = reps.values
      serialized_book[:author_name] = book['author_id'] && Author.find(book['author_id']).name
      serialized_book
    }
  end

  def self.change_reps(book)
    if book.end_date
      book.rep_0 = book.end_date + 10.days
      book.rep_1 = book.end_date + 30.days
      book.rep_2 = book.end_date + 60.days
    end
    book.save
  end

  def get_authenticated_user
    @current_user = AuthorizeApiRequest.call(request.headers).result
    @current_user || (render json: { error: 'Not Authorized' }, status: 401)
  end
end
