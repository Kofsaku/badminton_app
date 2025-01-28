class MatchGroup < ApplicationRecord
  belongs_to :match_round
  belongs_to :tournament_venue
  has_many :group_players, dependent: :destroy
  has_many :timetable_cell, dependent: :destroy
end