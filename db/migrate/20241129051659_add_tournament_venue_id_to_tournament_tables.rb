class AddTournamentVenueIdToTournamentTables < ActiveRecord::Migration[7.0]
  def change
    add_reference :tournament_tables, :tournament_venue, foreign_key: true
  end
end
