class CreateCreateUsers < ActiveRecord::Migration
  def change
    create_table :create_users do |t|
      t.string :name
      t.string :email
      t.string :zip_code
      t.string :password_digest

      t.timestamps null: false
    end
  end
end
