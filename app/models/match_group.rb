class MatchGroup < ApplicationRecord
  belongs_to :match_round
  has_many :group_player, dependent: :destroy
  has_many :timetable_cells, dependent: :destroy
end