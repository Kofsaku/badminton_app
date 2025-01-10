class CreateGroupPlayers < ActiveRecord::Migration[7.0]
  def change
    create_table :group_players do |t|
      t.references :match_group, foreign_key: true, null: false
      t.references :tournament_player, foreign_key: true, null: true
      t.integer :player_key, null: true
      t.integer :ranking, null: true

      t.timestamps
    end
  end
end
