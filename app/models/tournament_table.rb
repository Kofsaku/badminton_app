class TournamentTable < ApplicationRecord
  belongs_to :tournament
  belongs_to :tournament_category
  belongs_to :tournament_division

  enum table_type: { league: 0, tournament: 1 }

  validates :table_type, presence: true
end