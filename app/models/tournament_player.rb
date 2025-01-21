class TournamentPlayer < ApplicationRecord
  belongs_to :player, polymorphic: true
  belongs_to :tournament
  has_many :tournament_table_players
  has_many :tournament_tables, through: :tournament_table_players
  has_many :timetable_cells
  has_many :matches, through: :timetable_cells
end
