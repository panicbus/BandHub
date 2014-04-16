class BandsController < ApplicationController

  before_filter :authenticate_user!

  def index
    @bands = Band.all
    @band = Band.new
  end

  def show
  end

  def create
    @band = Band.create(name: params[:band_name],
                        blogs: params[:blogs]['0']['url'],
                        blogsa: params[:blogsa]['url'],
                        blogs1: params[:blogs1]['0']['name'],
                        blogs1a: params[:blogs1a]['name'],
                        image: params[:image]['url'],
                        news: params[:news]['0']['url'],
                        newsa: params[:newsa]['url'],
                        news1: params[:news1]['0']['name'],
                        news1a: params[:news1a]['name'],
                        reviews: params[:reviews]['0']['url'],
                        reviews1: params[:reviews1]['0']['name'],
                        urls: params[:urls]['official_url'],
                        urls1: params[:urls1]['lastfm_url'],
                        urls2: params[:urls2]['twitter_url'],
                        on_tour: params[:on_tour],
                        tour_dates: params[:tour_dates],
                        # biographies: params[:biographies],
                        artist_location: params[:artist_location],
                        video: params[:video]['0']['url'])

      #blogs, news & reviews are the links
      #blog1, news1 & reviews1 are the titles of each respective post

      favorite = current_user.favorites.create(band_id: @band.id)

    # if favorite.save
      # flash[:notice] = "Artist saved to Band Corral."
    # else
    #   # binding.pry_remote
    # end

    render nothing: true, status: 201
    
  end

  def favorite
    # this is grabbing data from the bands table through the favorites model & sticking it in user
    bands = current_user.bands
    render json: bands
  end

  def destroy
    # will delete from favorite table too... via dependent: :destroy method in favorite model
    Band.delete(params[:id])
    render nothing: true, status: 200
  end
end
