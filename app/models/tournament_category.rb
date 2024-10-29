class TournamentCategory < ApplicationRecord
  belongs_to :tournament
  has_many :tournament_divisions
  has_many :tournament_tables, dependent: :destroy
  
  accepts_nested_attributes_for :tournament_divisions, reject_if: :all_blank, allow_destroy: true
end