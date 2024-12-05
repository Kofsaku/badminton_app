class AddTimetableCellRefToMatches < ActiveRecord::Migration[7.0]
  def change
    add_reference :matches, :timetable_cell, null: true, foreign_key: true
  end
end
