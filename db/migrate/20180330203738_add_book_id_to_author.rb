class AddBookIdToAuthor < ActiveRecord::Migration[5.1]
  def change
    add_reference :authors, :book, foreign_key: true
  end
end
