class TournamentPlayer < ApplicationRecord
  belongs_to :player, polymorphic: true
  belongs_to :tournament
  has_many :tournament_table_players
  has_many :tournament_tables, through: :tournament_table_players
  has_many :timetable_cells
  has_many :matches, through: :timetable_cells
end


# model connection for the team_orders
class TournamentPlayer < ApplicationRecord
  has_many :team_orders, dependent: :destroy
  has_many :team_players, through: :team_orders
end
