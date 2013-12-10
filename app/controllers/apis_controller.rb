class ApisController < ApplicationController
  def api
    query = params[:band]
    echonest_key = ENV["ECHONEST_KEY"]
    # songkick_key = ENV["SONGKICK_KEY"]
    e_url = "http://developer.echonest.com/api/v4/artist/profile?api_key=" + echonest_key + "&name=" + query + "&format=json&bucket=biographies&bucket=blogs&bucket=news&bucket=reviews&bucket=images&bucket=artist_location&bucket=video"
    # s_url = ""
     # raise url.inspect
    e_req = Typhoeus.get(e_url)
    # s_req = Typhoeus.get(s_url)
    render :json => e_req.body
    # render :json => s_req.body
  end

  # def songkick
  #   query = params[:band]
  #   key = ENV["SONGKICK_KEY"]
  #   url = ""
  #   # raise url.inspect
  #   req = Typhoeus.get(url)
  #   render :json => req.body
  # end

end
