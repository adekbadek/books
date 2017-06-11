class ChangeBookRepetionsIndices < ActiveRecord::Migration[5.1]
  def change
    rename_column :books, :rep_1, :rep_0
    rename_column :books, :rep_2, :rep_1
    rename_column :books, :rep_3, :rep_2
  end
end
