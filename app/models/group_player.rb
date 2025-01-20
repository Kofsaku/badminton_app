class GroupPlayer < ApplicationRecord
  belongs_to :match_group
  belongs_to :tournament_player, optional: true
end