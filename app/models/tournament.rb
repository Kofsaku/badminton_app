class Tournament < ApplicationRecord
  belongs_to :user, optional: true
  has_many :tournament_divisions
  has_many :tournament_players
  has_many :tournament_venues

  accepts_nested_attributes_for :tournament_divisions, reject_if: :all_blank, allow_destroy: true
  accepts_nested_attributes_for :tournament_players, reject_if: :all_blank, allow_destroy: true
  accepts_nested_attributes_for :tournament_venues, reject_if: :all_blank, allow_destroy: true
end
