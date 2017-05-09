class AddRep1ToBooks < ActiveRecord::Migration[5.1]
  def change
    add_column :books, :rep_1, :date
  end
end
