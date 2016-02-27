class User < ActiveRecord::Base
  has_many :movie_trips
  has_many :restaurant_trips
  has_many :agendas
end
