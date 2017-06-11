class ApplicationController < ActionController::API
  before_action :get_authenticated_user
  attr_reader :current_user

  def self.serialize_books(books)
    rep_keys = %w[rep_1 rep_2 rep_3]

    books.map{|book|
      book = book.as_json
      reps = book.slice(*rep_keys)
      serialized_book = book.except(*rep_keys, 'user_id', 'updated_at', 'created_at')
      serialized_book[:reps] = reps.values
      serialized_book
    }
  end

  def self.change_reps(book)
    if book.end_date
      book.rep_1 = book.end_date + 10.days
      book.rep_2 = book.end_date + 30.days
      book.rep_3 = book.end_date + 60.days
    else
      book.rep_1 = nil
      book.rep_2 = nil
      book.rep_3 = nil
    end
    book.save
  end

  def get_authenticated_user
    @current_user = AuthorizeApiRequest.call(request.headers).result
    @current_user || (render json: { error: 'Not Authorized' }, status: 401)
  end
end
