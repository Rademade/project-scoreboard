class AddPositionToRole < ActiveRecord::Migration[5.0]
  def change
    add_column :roles, :position, :integer
  end
end
