class CreateUsers < ActiveRecord::Migration
  def change
    create_table :ideas do |t|
      t.string :title, :null => false, :default => '', :limit => 1000
      t.string :body, :null => false, :limit => 10000
      t.string :user_id, :null => false
      t.integer :score, :null => false, :default => 0

      t.timestamps
    end
    add_index :ideas, :title
  end
end
