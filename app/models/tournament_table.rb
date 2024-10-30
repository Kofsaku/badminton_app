class TournamentTable < ApplicationRecord
  belongs_to :tournament
  belongs_to :tournament_category
  belongs_to :tournament_division
  has_many :tournament_table_players, dependent: :destroy
  has_many :tournament_players, through: :tournament_table_players

  enum table_type: { league: 0, tournament: 1 }

  validates :table_type, presence: true
end