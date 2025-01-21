class TeamMatchOrder < ApplicationRecord
  belongs_to :user
  belongs_to :team
  belongs_to :match
end
