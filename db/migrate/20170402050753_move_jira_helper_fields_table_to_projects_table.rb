class MoveJiraHelperFieldsTableToProjectsTable < ActiveRecord::Migration[5.0]
  def change
    remove_column :projects, :jira_helper_field_id
    add_column :projects, :jira_rapid_view_id, :integer
    add_column :projects, :jira_story_points_field, :string, default: 'customfield_10022'
    drop_table :jira_helper_fields
  end
end
