class CreateTodos < ActiveRecord::Migration[5.1]
  def change
    create_table :todos do |t|
      t.boolean :is_completed
      t.belongs_to :book, foreign_key: true
      t.belongs_to :user, foreign_key: true
      t.string :action
      t.date :due_date

      t.timestamps
    end
  end
end
