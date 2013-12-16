class AddColumnSeconditemToBands < ActiveRecord::Migration
  def change
    add_column :bands, :newsa, :string
    add_column :bands, :news1a, :string
    add_column :bands, :blogsa, :string
    add_column :bands, :blogs1a, :string
  end
end
