class AddColumnsTo < ActiveRecord::Migration

  def change
    add_column :bands, :bio, :string
    add_column :bands, :news, :string
    add_column :bands, :reviews, :string
    add_column :bands, :blogs, :string
    add_column :bands, :image, :string
    add_column :bands, :image_url, :string
    add_column :bands, :on_tour, :string
    add_column :bands, :tour_dates, :string
    add_column :bands, :biographies, :string
    add_column :bands, :artist_location, :string
    add_column :bands, :video, :string

  end


end
