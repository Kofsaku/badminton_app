class CreateMatchGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :match_groups do |t|
      t.references :match_round, foreign_key: true, null: false
      t.integer :group_number, null: false
      t.integer :group_size, null: false
      t.references :tournament_venue, foreign_key: true, null: false

      t.timestamps
    end
  end
end
