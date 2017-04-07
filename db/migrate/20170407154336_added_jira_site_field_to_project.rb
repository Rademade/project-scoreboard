class AddedJiraSiteFieldToProject < ActiveRecord::Migration[5.0]
  def change
     add_column :projects, :jira_site, :string
  end
end
