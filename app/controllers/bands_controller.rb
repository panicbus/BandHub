class BandsController < ApplicationController

  before_filter :authenticate_user!, except: [:index, :show]

  def index
    @bands = Band.all
    @band = Band.new
  end

  def show
  end

  def create


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
