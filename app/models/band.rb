class Band < ActiveRecord::Base
  attr_accessible :name, :bio, :news, :newsa, :news1, :news1a, :response, :reviews, :reviews1, :blogs, :blogsa, :blogs1, :blogs1a, :urls, :urls1, :urls2, :image, :image_url, :on_tour, :tour_dates, :biographies, :artist_location, :video, :echo_id, :songkick_band_id

  has_many :favorites
  has_many :bands, through: :favorites

  validates :songkick_band_id, uniqueness: true
  # validates :songkick_band_id, uniqueness: {message: "boom, that artist already added"}

end
