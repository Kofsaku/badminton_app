class Match < ApplicationRecord
  belongs_to :timetable_cell
  has_many :team_match_orders, dependent: :destroy

  accepts_nested_attributes_for :team_match_orders, reject_if: proc { |att| att['order'].blank? }, allow_destroy: true 

  enum status: { pending: 0, completed: 1 }

  before_create :build_default_name, if: -> { name.blank? }

  def build_default_name
    name = timetable_cell.tournament_venue.tournament.name.to_s + ''
             timetable_cell.tournament_venue.venue_name.to_s + ''
             name.to_s
  end
end
