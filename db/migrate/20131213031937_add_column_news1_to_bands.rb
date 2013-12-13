class AddColumnNews1ToBands < ActiveRecord::Migration
  def change
    add_column :bands, :news1, :string
  end
end
