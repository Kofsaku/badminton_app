class AddTournamentToTimetables < ActiveRecord::Migration[7.0]
  def change
    add_reference :timetables, :tournament, null: false, foreign_key: true
  end
end
