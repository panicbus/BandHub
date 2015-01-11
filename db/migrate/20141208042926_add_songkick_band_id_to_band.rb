class AddSongkickBandIdToBand < ActiveRecord::Migration
  def change
  	add_column :bands, :songkick_band_id, :string
  end
end
