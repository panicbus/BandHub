class BandsController < ApplicationController

  before_filter :authenticate_user!
  after_filter { flash.discard if request.xhr? }

  def index
    @bands = Band.all
    @band = Band.new
  end

  def show
  end

  def create

    @band = Band.create(echo_id: params[:echo_id],
                        songkick_band_id: params[:songkick_band_id])

    favorite = current_user.favorites.create(band_id: @band.id)

    respond_to do |format|
      format.js { flash[:notice] = "test bitches!"}
    end
    
    # if favorite.save
    #   flash[:notice] = "Artist saved to Band Corral."
    # # else
    # #   remote
    # end

    # head :ok preferred over render nothing: true, status 201 in Rails 4
    head :ok, content_type: "text/html"

  end

  def favorite
    # this is grabbing data from the bands table through the favorites model & sticking it in user
    user_bands = current_user.bands
    bands = get_fresh(user_bands)
    render json: bands
  end

  def destroy
    # will delete from favorite table too... via dependent: :destroy method in favorite model
    Band.delete(params[:id])
    render nothing: true, status: 200
  end

  def get_fresh(bands)
    bandsArray = []
    thread_list = []
    echonest_key = ENV["ECHONEST_KEY"]
    songkick_key = ENV["SONGKICK_KEY"]
    bands.each do |band|
      echo_url = "http://developer.echonest.com/api/v4/artist/profile?api_key=" + echonest_key + "&id=" + band.echo_id + "&format=json&bucket=biographies&bucket=blogs&bucket=news&bucket=reviews&bucket=urls&bucket=images&bucket=artist_location&bucket=video"
      songkick_url = "http://api.songkick.com/api/3.0/search/artists.json?query=" + band.songkick_band_id.gsub(' ','+') + "&apikey=" + songkick_key
      
      thread_list << Thread.new {
        echo_band_info = Typhoeus.get( echo_url )  
        songkick_info = Typhoeus.get( songkick_url ) 
        puts Time.now
        # Typhoeus returns an object, here we're drilling down to get response body & converting it from JSON to hash 
        band_info = {:echo_info => JSON.parse(echo_band_info.response_body), 
                     :kick_info => JSON.parse(songkick_info.response_body), 
                     :created_at => band.created_at, 
                     :database_id => band.id}
        bandsArray.push(band_info)
      }
    end
    thread_list.each {|thread| thread.join}
    bandsArray
  end
end
