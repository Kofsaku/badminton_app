class MatchGroup < ApplicationRecord
  belongs_to :match_round
  has_many :group_player, dependent: :destroy
end