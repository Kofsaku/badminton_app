class KnockoutTable < TournamentTable
  enum bracket_directions: { left_to_right: 0, right_to_left: 1 }

  validates :size, presence: true, numericality: { only_integer: true, greater_than_or_equal_to: 2 }
  validates :bracket_direction, presence: true
end
