class CreateTournamentTables < ActiveRecord::Migration[7.0]
  def change
    create_table :tournament_tables do |t|
      t.string :name, null: false
      t.integer :table_type, null: false
      t.references :tournament, foreign_key: true, null: false
      t.references :tournament_category, foreign_key: true, null: false
      t.references :tournament_division, foreign_key: { to_table: :tournament_divisions }, null: false
      t.integer :size, null: false
      
      t.timestamps
    end
  end
end
