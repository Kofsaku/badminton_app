class Timetable < ApplicationRecord
  belongs_to :tournament_venue

  validates :row_count, presence: true, numericality: { only_integer: true, greater_than: 0 }

  # コート数に基づいて列数を取得するメソッド
  def column_count
    tournament_venue.no_of_courts
  end
end
