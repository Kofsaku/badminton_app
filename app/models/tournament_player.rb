class TournamentPlayer < ApplicationRecord
  belongs_to :player, polymorphic: true
  belongs_to :tournament
end
