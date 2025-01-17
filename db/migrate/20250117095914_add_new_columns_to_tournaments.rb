class AddNewColumnsToTournaments < ActiveRecord::Migration[7.0]
  def change
    add_column :tournaments, :region, :string
    add_column :tournaments, :prefecture, :string
  end
end
