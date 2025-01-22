# db/migrate/YYYYMMDDHHMMSS_create_team_orders.rb
class CreateTeamOrders < ActiveRecord::Migration[7.0]
    def change
      create_table :team_orders do |t|
        t.references :tournament_player, null: false, foreign_key: true
        t.references :team_player, null: false, foreign_key: true
        t.integer :order_number, null: false
        t.string :status, default: '未入力'
  
        t.timestamps
      end
      add_index :team_orders, [:tournament_player_id, :order_number], unique: true
    end
  end