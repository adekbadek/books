class AddStartDateToBooks < ActiveRecord::Migration[5.1]
  def change
    add_column :books, :start_date, :date
  end
end
