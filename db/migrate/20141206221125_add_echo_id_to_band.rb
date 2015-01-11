class AddEchoIdToBand < ActiveRecord::Migration
  def change
    add_column :bands, :echo_id, :string
  end
end
