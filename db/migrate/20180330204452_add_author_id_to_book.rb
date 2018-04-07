class AddAuthorIdToBook < ActiveRecord::Migration[5.1]
  def change
    add_reference :books, :author, foreign_key: true
  end
end
