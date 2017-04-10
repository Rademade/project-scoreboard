class RefactorDb < ActiveRecord::Migration[5.0]
  def change
    rename_column :projects, :jira_rapid_view_id, :jira_board_id
    remove_column :jira_accounts, :site
  end
end
