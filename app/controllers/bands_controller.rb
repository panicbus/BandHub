class BandsController < ApplicationController

  before_filter :authenticate_user!, except: [:index, :show]

  def index
    @bands = Band.all
    @band = Band.new
  end

  def show
  end

  def create
      @band = Band.create(name: params[:item])
      # binding.pry
      favorite = Favorite.create(
        user_id: current_user.id,
        name: @band.name,
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
