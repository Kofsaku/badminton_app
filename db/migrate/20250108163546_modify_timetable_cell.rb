class ModifyTimetableCell < ActiveRecord::Migration[7.0]
  def change
    remove_column :timetable_cells, :timetable_id
    remove_column :timetable_cells, :tournament_table_id
    add_reference :timetable_cells, :tournament_venue, foreign_key: true
    add_reference :timetable_cells, :match_group, foreign_key: true
  end
end
