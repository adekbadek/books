class AddReasonToBooks < ActiveRecord::Migration[5.1]
  def change
    add_column :books, :reason, :string
  end
end
