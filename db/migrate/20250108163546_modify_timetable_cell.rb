class ModifyTimetableCell < ActiveRecord::Migration[7.0]
  def change
    remove_column :timetable_cells, :timetable_id, :integer
    remove_column :timetable_cells, :tournament_table_id, :integer
    add_reference :timetable_cells, :tournament_venue, foreign_key: true
    add_reference :timetable_cells, :match_group, foreign_key: true
    add_column :timetable_cells, :player_key, :integer
    add_column :timetable_cells, :second_player_key, :integer
  end
end
