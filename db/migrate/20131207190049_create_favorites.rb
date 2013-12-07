class CreateFavorites < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.string :name
      t.string :news
      t.string :reviews
      t.string :bio
      t.string :response
      t.integer :user_id

      t.timestamps
    end
  end
end
