class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :encrypted_password
      t.boolean :admin
      t.integer :role_id, index: true

      t.timestamps
    end
  end
end
