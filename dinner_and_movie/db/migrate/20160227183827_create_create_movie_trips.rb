class CreateCreateMovieTrips < ActiveRecord::Migration
  def change
    create_table :create_movie_trips do |t|
      t.string :title
      t.date :date
      t.string :time
      t.string :theater_name
      t.string :theater_zip

      t.timestamps null: false
    end
  end
end
