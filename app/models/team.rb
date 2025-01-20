class Team < ApplicationRecord
  has_many :team_players, dependent: :destroy
  has_many :users, through: :team_players
  has_many :tournament_players, as: :player
  has_many :timetable_cells, through: :tournament_players
  has_many :matches, through: :timetable_cells
  has_many :team_match_orders, dependent: :destroy

  def ordered_members(match)
    team_match_order_ids = match.team_match_orders.where(team: self).order(order: :asc)
    if team_match_order_ids.present?
      users = self.users.where(id: team_match_orders.where(id: team_match_order_ids).pluck(:user_id))
    else
      self.users
    end
  end
end
