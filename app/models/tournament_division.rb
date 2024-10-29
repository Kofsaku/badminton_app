class TournamentDivision < ApplicationRecord
  # belongs_to :tournament
  belongs_to :tournament_category
  has_many :tournament_tables, dependent: :destroy
end
