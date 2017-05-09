class AddRep2ToBooks < ActiveRecord::Migration[5.1]
  def change
    add_column :books, :rep_2, :date
  end
end
