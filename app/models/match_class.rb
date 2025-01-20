class MatchClass < ApplicationRecord
  belongs_to :tournament
  belongs_to :tournament_category
  belongs_to :tournament_division
  has_many :match_round, dependent: :destroy
end