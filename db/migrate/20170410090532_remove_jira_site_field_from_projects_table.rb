class RemoveJiraSiteFieldFromProjectsTable < ActiveRecord::Migration[5.0]
  def change
    remove_column :projects, :jira_site
  end
end
