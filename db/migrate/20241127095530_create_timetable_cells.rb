class CreateTimetableCells < ActiveRecord::Migration[7.0]
  def change
    create_table :timetable_cells do |t|
      t.references :timetable, null: false, foreign_key: true
      t.references :tournament_table, null: false, foreign_key: true
      t.references :tournament_player, foreign_key: true
      t.references :second_tournament_player, foreign_key: { to_table: :tournament_players }
      t.integer :number, null: false

      t.timestamps
    end
  end
end
