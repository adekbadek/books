class ApplicationController < ActionController::API
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
end
