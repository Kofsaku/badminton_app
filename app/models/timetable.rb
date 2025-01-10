class Timetable < ApplicationRecord
  belongs_to :tournament_venue
  belongs_to :tournament

  has_many :tournament_tables, dependent: :destroy
  has_many :timetable_cells, dependent: :destroy
end
