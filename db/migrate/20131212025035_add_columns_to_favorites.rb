class AddColumnsToFavorites < ActiveRecord::Migration
  def change
    add_column :favorites, :image, :string
    add_column :favorites, :image_url, :string
    add_column :favorites, :blogs, :string
    add_column :favorites, :on_tour, :string
    add_column :favorites, :tour_dates, :string
    add_column :favorites, :biographies, :string
    add_column :favorites, :artist_location, :string
    add_column :favorites, :video, :string
  end
end
