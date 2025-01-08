class AddColumnInTableTournamentVenue < ActiveRecord::Migration[7.0]
  def up
    add_column :tournament_venues, :category_type, :string
    add_column :tournament_venues, :division_number, :string
  end

  def down
    remove_column :tournament_venues, :category_type
    remove_column :tournament_venues, :division_number
  end
end
