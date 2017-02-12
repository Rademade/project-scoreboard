class CreateProjects < ActiveRecord::Migration[5.0]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :jira_host
      t.string :jira_api_key

      t.timestamps
    end
  end
end
