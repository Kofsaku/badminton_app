class CreateMatches < ActiveRecord::Migration[7.0]
  def change
    create_table :matches do |t|
      t.string :match_type
      t.string :player1
      t.string :player2
      t.string :player3
      t.string :player4
      t.string :winner
      t.text :match_log
      t.string :status

      t.timestamps
    end
  end
end
