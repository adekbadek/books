class AddRep3ToBooks < ActiveRecord::Migration[5.1]
  def change
    add_column :books, :rep_3, :date
  end
end
