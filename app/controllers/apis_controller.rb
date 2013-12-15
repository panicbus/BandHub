class ApisController < ApplicationController
  def api
    query = params[:band]
    echonest_key = ENV["ECHONEST_KEY"]
    url = "http://developer.echonest.com/api/v4/artist/profile?api_key=" + echonest_key + "&name=" + query + "&format=json&bucket=biographies&bucket=blogs&bucket=news&bucket=reviews&bucket=urls&bucket=images&bucket=artist_location&bucket=video"
    e_req = Typhoeus.get(url)
    render :json => e_req.body
    # render :json => s_req.body
  end

  def songkick
    s_query = params[:band]
    songkick_key = ENV["SONGKICK_KEY"]
    s_url = "http://api.songkick.com/api/3.0/search/artists.json?query=" + s_query + "&apikey=" + songkick_key
    s_req = Typhoeus.get(s_url)
    render :json => s_req.body
  end

end
