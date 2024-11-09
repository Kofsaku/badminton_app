class TournamentPlayer < ApplicationRecord
  belongs_to :user
  belongs_to :tournament
  has_many :tournament_table_players
  has_many :tournament_tables, through: :tournament_table_players
end
