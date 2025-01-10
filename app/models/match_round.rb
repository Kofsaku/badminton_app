class MatchRound < ApplicationRecord
  belongs_to :match_class
  has_many :match_group, dependent: :destroy
end