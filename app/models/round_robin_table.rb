class RoundRobinTable < TournamentTable
  validates :size, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 2 }
end
