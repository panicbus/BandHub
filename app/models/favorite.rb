class Favorite < ActiveRecord::Base
  attr_accessible :band_id

  belongs_to :user
  belongs_to :band

  validates_uniqueness_of :band_id, :scope => :user_id
end
