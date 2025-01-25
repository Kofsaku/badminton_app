class Tournament < ApplicationRecord
  belongs_to :user, optional: true
  has_many :tournament_categories, dependent: :destroy
  has_many :tournament_players, dependent: :destroy
  has_many :tournament_venues, dependent: :destroy
  has_many :tournament_tables, through: :tournament_venues
  has_many :tags, as: :taggable, dependent: :destroy
  has_one_attached :banner

  accepts_nested_attributes_for :tournament_categories, reject_if: :all_blank, allow_destroy: true
  accepts_nested_attributes_for :tournament_players, reject_if: :all_blank, allow_destroy: true
  accepts_nested_attributes_for :tournament_venues, reject_if: :all_blank, allow_destroy: true

  def tournament_venues_attributes
    tournament_venues.as_json()
  end

  def tournament_categories_attributes
    tournament_categories.as_json()
  end
end
