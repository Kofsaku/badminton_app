class CreateTeamMatchOrder < ActiveRecord::Migration[7.0]
  def change
    create_table :team_match_orders do |t|
      t.references :user
      t.references :team
      t.references :match
      t.integer :order

      t.timestamps
    end
  end
end
