class TeamPlayer < ApplicationRecord
  belongs_to :team
  belongs_to :user
end

# model connection for the team_orders
class TeamPlayer < ApplicationRecord
  has_many :team_orders
  has_many :tournament_players, through: :team_orders
end
