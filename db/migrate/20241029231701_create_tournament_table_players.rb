class CreateTournamentTablePlayers < ActiveRecord::Migration[7.0]
  def change
    create_table :tournament_table_players do |t|
      t.references :tournament_table, null: false, foreign_key: {on_delete: :cascade}
      t.references :tournament_player, null: false, foreign_key: true

      t.timestamps
    end
  end
end
