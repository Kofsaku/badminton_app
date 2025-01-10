class AddTournamentCategoryIdToTournamentPlayers < ActiveRecord::Migration[7.0]
  def change
    add_reference :tournament_players, :tournament_category, index: true
    add_reference :tournament_players, :tournament_division, index: true
  end
end
