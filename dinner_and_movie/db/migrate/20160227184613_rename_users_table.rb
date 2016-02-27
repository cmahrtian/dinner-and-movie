class RenameUsersTable < ActiveRecord::Migration
  def change
  	rename_table :create_users, :users
  end
end
