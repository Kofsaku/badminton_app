class AddTimetableToTournamentTables < ActiveRecord::Migration[7.0]
  def change
    add_reference :tournament_tables, :timetable, foreign_key: true
  end
end