class CreateTournamentDivisions < ActiveRecord::Migration[7.0]
  def change
    create_table :tournament_divisions do |t|
      t.string :division
      t.integer :participants_limit
      t.integer :pairs_limit
      t.integer :trios_limit

      t.references :tournament, null: false, foreign_key: true

      t.timestamps
    end
  end
end
