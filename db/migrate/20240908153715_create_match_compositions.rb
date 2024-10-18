class CreateMatchCompositions < ActiveRecord::Migration[7.0]
  def change
    create_table :match_compositions do |t|
      t.string :string
      #t.references :tournament_division, null: false, foreign_key: true
      t.references :tournament, null: false, foreign_key: true

      t.timestamps
    end
  end
end
