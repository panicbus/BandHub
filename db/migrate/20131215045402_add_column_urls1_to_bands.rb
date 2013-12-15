class AddColumnUrls1ToBands < ActiveRecord::Migration
  def change
    add_column :bands, :urls1, :string
  end
end
