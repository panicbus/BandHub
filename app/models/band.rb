class Band < ActiveRecord::Base
  attr_accessible :name, :bio, :news, :news1, :response, :reviews, :reviews1, :blogs, :blogs1, :image, :image_url, :on_tour, :tour_dates, :biographies, :artist_location, :video

  has_many :favorites
  has_many :bands, through: :favorites

end
