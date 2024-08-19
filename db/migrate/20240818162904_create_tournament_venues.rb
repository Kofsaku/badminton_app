class CreateTournamentVenues < ActiveRecord::Migration[7.0]
  def change
    create_table :tournament_venues do |t|
      t.string :venue_name
      t.string :venue_address
      t.integer :no_of_courts
      t.date :venue_date
      t.references :tournament, null: false, foreign_key: true

      t.timestamps
    end
  end
end
