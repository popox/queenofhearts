class AddProjectIdToIdeas < ActiveRecord::Migration
  def change
    change_table :ideas do |t|
      t.string :project_id, :null => false, :default => 0, :limit => 1000
    end
  end
end
