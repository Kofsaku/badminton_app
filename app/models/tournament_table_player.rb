class TournamentTablePlayer < ApplicationRecord
  belongs_to :tournament_table
  belongs_to :tournament_player
end
