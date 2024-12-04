class TimetableCell < ApplicationRecord
  belongs_to :timetable
  belongs_to :tournament_table
  belongs_to :tournament_player, optional: true
  belongs_to :second_tournament_player, class_name: 'TournamentPlayer', optional: true

  validates :number, presence: true, numericality: { only_integer: true }
end
