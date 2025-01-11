class TournamentVenue < ApplicationRecord
  belongs_to :tournament
  has_many :timetable_cells, dependent: :destroy
  has_many :tournament_tables, dependent: :destroy
end
