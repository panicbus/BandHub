require 'spec_helper'

describe ApisController do

  describe "API success" do
    it "should return a response message of success" do
      get :api, band: 'radiohead'
      response.message.should == 'OK'
    end
  end

end

describe BandsController do

#   describe "GET index" do
#     it "has a 200 status code" do
#       get :index
#       expect(response.status).to eq(200)
#     end
#   end


  describe "POST create" do
    it "should create a new Band favorite" do
      expect{ post :create, band: {name: 'new name'}}.to
        change(Favorite, :count).by(1)
      end
    end

  end

#   describe "DELETE band" do
#     it "should delete the Band" do
#       expect{ delete :destroy, id: 1}.to
#         change(Band, :count).by(-1)
#       end
#     end
#   end

# end