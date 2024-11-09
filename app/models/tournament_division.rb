class TournamentDivision < ApplicationRecord
  has_many :tournament_tables, dependent: :destroy
  belongs_to :tournament_category
end
