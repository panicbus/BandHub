class FixColumnName < ActiveRecord::Migration
  def change
        rename_column :favorites, :name, :band_id
        change_column :favorites, :band_id, :integer
    end

end
