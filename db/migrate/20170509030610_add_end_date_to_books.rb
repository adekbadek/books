class AddEndDateToBooks < ActiveRecord::Migration[5.1]
  def change
    add_column :books, :end_date, :date
  end
end
