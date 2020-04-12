class AddCompletedAtToTodos < ActiveRecord::Migration[5.1]
  def change
    add_column :todos, :completed_on, :date
  end
end
