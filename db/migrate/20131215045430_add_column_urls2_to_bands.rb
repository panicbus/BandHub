class AddColumnUrls2ToBands < ActiveRecord::Migration
  def change
    add_column :bands, :urls2, :string
  end
end
