class RenameMoviesTable < ActiveRecord::Migration
  def change
  	rename_table :create_movie_trips, :movie_trips
  end
end
