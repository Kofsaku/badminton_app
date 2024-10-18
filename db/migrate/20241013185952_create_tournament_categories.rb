class CreateTournamentCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :tournament_categories do |t|
      t.references :tournament, null: false, foreign_key: true
      t.string :category_type
      t.boolean :is_league
      t.boolean :is_tournament
      t.string :number_of_games
      t.integer :score
      t.float :time_limit
      t.integer :break_point
      t.float :interval_duration
      t.integer :points_limit
      t.string :division_name_type
      t.integer :division_number
      t.boolean :switch_during_game, default: true
      t.integer :switch_score_during_game, default: 11
      t.boolean :switch_between_games
      t.string :match_composition
      t.string :match_facilitator

      t.timestamps
    end
  end
end
