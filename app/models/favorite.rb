class Favorite < ActiveRecord::Base
  attr_accessible :band_id

  belongs_to :user
  belongs_to :band, dependent: :destroy

# dependent: :destroy forces delete from Band's dependent table, in this case Favorite

  validates_uniqueness_of :band_id, :scope => :user_id
end
