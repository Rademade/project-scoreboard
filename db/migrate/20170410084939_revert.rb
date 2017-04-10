class Revert < ActiveRecord::Migration[5.0]
  def change
    add_column :jira_accounts, :site, :string
  end
end
