class RemoveColumnsFrom < ActiveRecord::Migration

  def change
    remove_column :favorites, :news
    remove_column :favorites, :reviews
    remove_column :favorites, :bio
    remove_column :favorites, :response

  end

end
