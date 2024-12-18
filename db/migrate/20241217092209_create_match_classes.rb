class CreateMatchClasses < ActiveRecord::Migration[7.0]
  def change
    create_table :match_classes do |t|
      t.references :tournament, foreign_key: true, null: false
      t.references :tournament_category, foreign_key: true, null: false
      t.references :tournament_division, foreign_key: true, null: false
      t.integer :size, null: false

      t.timestamps
    end
  end
end
