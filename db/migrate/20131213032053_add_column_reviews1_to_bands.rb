class AddColumnReviews1ToBands < ActiveRecord::Migration
  def change
    add_column :bands, :reviews1, :string
  end
end
