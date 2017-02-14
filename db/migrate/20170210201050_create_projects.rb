class CreateProjects < ActiveRecord::Migration[5.0]
  def change
    create_table :projects do |t|
      t.string :name
      t.integer :jira_account_id, index: true

      t.timestamps
    end
  end
end
