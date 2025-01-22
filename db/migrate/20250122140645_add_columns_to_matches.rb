class AddColumnsToMatches < ActiveRecord::Migration[7.0]
  def change
    add_column :matches, :player1, :string
    add_column :matches, :player2, :string
    add_column :matches, :player3, :string
    add_column :matches, :player4, :string
  end
end
