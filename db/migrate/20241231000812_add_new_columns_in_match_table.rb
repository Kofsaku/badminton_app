class AddNewColumnsInMatchTable < ActiveRecord::Migration[7.0]
  def change
    add_column :matches, :winning_points, :integer
    add_column :matches, :number_of_sets, :integer
  end
end
