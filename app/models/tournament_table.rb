class TournamentTable < ApplicationRecord
  belongs_to :tournament
  belongs_to :tournament_venue
  belongs_to :tournament_category
  belongs_to :tournament_division
  belongs_to :timetable
  has_many :tournament_table_players, dependent: :destroy
  has_many :tournament_players, through: :tournament_table_players
  has_many :timetable_cells, dependent: :destroy

  enum table_type: { league: 0, tournament: 1 }
  enum bracket_direction: { left_to_right: 0, right_to_left: 1 }

  validates :table_type, presence: true
end