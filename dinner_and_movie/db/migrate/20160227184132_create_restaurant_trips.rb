class CreateRestaurantTrips < ActiveRecord::Migration
  def change
    create_table :restaurant_trips do |t|
      t.string :name
      t.string :zip_code
      t.string :cuisine
      t.date :date
      t.string :time

      t.timestamps null: false
    end
  end
end
