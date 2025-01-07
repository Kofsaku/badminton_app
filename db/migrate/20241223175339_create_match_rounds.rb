class CreateMatchRounds < ActiveRecord::Migration[7.0]
  def change
    create_table :match_rounds do |t|
      t.references :match_class, foreign_key: true, null: false
      t.integer :round_number, null: false
      t.integer :round_type, null: false
      t.integer :round_size, null: false
      t.integer :number_of_winners, null: false

      t.timestamps
    end
  end
end
