class TimetableCell < ApplicationRecord
  belongs_to :tournament_venue
  belongs_to :match_group
  belongs_to :tournament_player, optional: true
  belongs_to :second_tournament_player, class_name: 'TournamentPlayer', optional: true
  has_one :match, dependent: :destroy

  validates :number, presence: true, numericality: { only_integer: true }
end
