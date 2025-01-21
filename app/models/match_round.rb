class MatchRound < ApplicationRecord
  belongs_to :match_class
  has_many :match_groups, dependent: :destroy
end