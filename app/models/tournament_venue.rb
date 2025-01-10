class TournamentVenue < ApplicationRecord
  belongs_to :tournament
  has_many :timetable_cells, dependent: :destroy
end
