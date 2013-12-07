class Favorite < ActiveRecord::Base
  attr_accessible :bio, :name, :news, :response, :reviews, :user_id

  belongs_to :user

  validates_uniqueness_of :name, :scope => :user_id
end
