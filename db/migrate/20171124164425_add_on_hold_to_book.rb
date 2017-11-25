class AddOnHoldToBook < ActiveRecord::Migration[5.1]
  def change
    add_column :books, :on_hold, :date
  end
end
