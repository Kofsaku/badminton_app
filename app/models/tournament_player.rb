class TournamentPlayer < ApplicationRecord
  belongs_to :player, polymorphic: true
  belongs_to :tournament
  has_many :tournament_table_players, dependent: :destroy
  has_many :tournament_tables, through: :tournament_table_players, dependent: :destroy
end
