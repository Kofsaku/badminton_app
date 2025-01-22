class TeamOrder < ApplicationRecord
  belongs_to :tournament_player
  belongs_to :team_player
  
  validates :order_number, presence: true, uniqueness: { scope: :tournament_player_id }
  validates :status, presence: true
  
  enum status: { '未入力': 0, '入力完了': 1 }
end

