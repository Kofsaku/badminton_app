class MatchGroup < ApplicationRecord
  belongs_to :match_round
  has_many :group_players, dependent: :destroy
  has_many :timetable_cell, dependent: :destroy
end