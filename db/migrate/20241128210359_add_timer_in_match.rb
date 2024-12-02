class AddTimerInMatch < ActiveRecord::Migration[7.0]
  def change
    add_column :matches, :match_time, :string
    add_column :matches, :match_score_teamA, :integer, default: 0
    add_column :matches, :match_score_teamB, :integer, default: 0
  end
end
