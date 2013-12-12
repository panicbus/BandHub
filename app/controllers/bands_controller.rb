class BandsController < ApplicationController

  before_filter :authenticate_user!, except: [:index, :show]

  def index
    @bands = Band.all
    @band = Band.new
  end

  def show
  end

  def create
      @band = Band.create(name: params[:band_name])

                          # , blogs: params[:blogs],
                          # image: params[:image], image_url: params[:image_url],
                          # news: params[:news], reviews: params[:reviews],
                          # on_tour: params[:on_tour], tour_dates: params[:tour_dates],
                          # biographies: params[:biographies],
                          # artist_location: params[:artist_location], video: params[:video])

      # binding.pry
      favorite = Favorite.create(
        user_id: current_user.id,
        name: @band.name,
        blogs: @band.blogs,
        image: @band.image,
        image_url: @band.image_url,
        news: @band.news,
        reviews: @band.reviews,
        on_tour: @band.on_tour,
        tour_dates: @band.tour_dates,
        biographies: @band.biographies,
        artist_location: @band.artist_location,
        video: @band.video
      )
    if favorite.save
      flash[:message] = "Artist saved to Favorites"
    else
      flash[:message] = "Oops, artist didn't save. Please try again."
    end
  end

  def favorite
    #bands = current_user.favorites
    bands = Favorite.where(user_id: current_user.id)
    render json: bands
  end

  def destroy
    Favorite.delete(params[:id])
    render nothing: true, status: 200
  end
end
