class RemoveRepsFromBooks < ActiveRecord::Migration[5.1]
  change_table :books do |t|
    t.remove :rep_0, :rep_1, :rep_2
  end
end
