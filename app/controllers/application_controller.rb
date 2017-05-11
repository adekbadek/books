class ApplicationController < ActionController::API
  before_action :authenticate_request
  attr_reader :current_user

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

  private

  def authenticate_request
    @current_user = AuthorizeApiRequest.call(request.headers).result
    render json: { error: 'Not Authorized' }, status: 401 unless @current_user
  end
end
