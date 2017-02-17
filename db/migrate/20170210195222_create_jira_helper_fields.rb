class CreateJiraHelperFields < ActiveRecord::Migration[5.0]
  def change
    create_table :jira_helper_fields do |t|
      t.integer :rapid_view_id
      t.string :story_points_field
      t.string :story_status_field

      t.timestamps
    end
  end
end
