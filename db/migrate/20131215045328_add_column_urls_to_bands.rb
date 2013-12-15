class AddColumnUrlsToBands < ActiveRecord::Migration
  def change
    add_column :bands, :urls, :string
  end
end
