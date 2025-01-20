class AddChangeToMatches < ActiveRecord::Migration[7.0]
  def up
    remove_column :matches, :player1, :string
    remove_column :matches, :player2, :string
    remove_column :matches, :player3, :string
    remove_column :matches, :player4, :string
    add_column :matches, :name, :string, null: false, default: ''

    remove_column :matches, :status, :string
    add_column :matches, :status, :integer, default: 0
  end

  def down
    add_column :matches, :player1, :string
    add_column :matches, :player2, :string
    add_column :matches, :player3, :string
    add_column :matches, :player4, :string
    remove_column :matches, :name, :string, null: false, default: ''

    remove_column :matches, :status, :integer, default: 0
    add_column :matches, :status, :string
  end
end
