class CreateSprints < ActiveRecord::Migration[5.0]
  def change
    create_table :sprints do |t|
      t.belongs_to :project, index: true
      t.string :name, null: false
      t.float :planned_velocity, default: 0, null: false
      t.float :deviation_velocity, default: 0, null: false
      t.date :started_at, null: false
      t.date :ended_at, null: false
    end
  end
end
