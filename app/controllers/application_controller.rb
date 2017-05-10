class ApplicationController < ActionController::API
  def self.add_reps(book)
    book.rep_1 = book.end_date + 10.days
    book.rep_2 = book.end_date + 30.days
    book.rep_3 = book.end_date + 60.days

    book.save
  end
end
