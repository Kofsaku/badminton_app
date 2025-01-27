class TournamentCategory < ApplicationRecord
  belongs_to :tournament
  has_many :tournament_divisions, dependent: :destroy
  
  accepts_nested_attributes_for :tournament_divisions, reject_if: :all_blank, allow_destroy: true
  
  validates :games, presence: true, if: :show_intervals?
end