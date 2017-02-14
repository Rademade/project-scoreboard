class CreateJiraHelperFields < ActiveRecord::Migration[5.0]
  def change
    create_table :jira_helper_fields do |t|
      t.integer :rapid_view_id

      t.timestamps
    end
  end
end
