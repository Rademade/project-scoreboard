class CreateJiraAccounts < ActiveRecord::Migration[5.0]
  def change
    create_table :jira_accounts do |t|
      t.string :username
      t.string :password
      t.string :site

      t.timestamps
    end
  end
end
