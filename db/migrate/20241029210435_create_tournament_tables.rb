class CreateTournamentTables < ActiveRecord::Migration[7.0]
  def change
    create_table :tournament_tables do |t|
      t.integer :table_type, null: false
      t.references :match_classes, foreign_key: true, null: false
      t.integer :size, null: false
      
      t.timestamps
    end
  end
end
