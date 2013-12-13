class AddColumnBlogs1ToBands < ActiveRecord::Migration
  def change
    add_column :bands, :blogs1, :string
  end
end
