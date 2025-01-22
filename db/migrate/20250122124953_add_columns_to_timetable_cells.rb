class AddColumnsToTimetableCells < ActiveRecord::Migration[7.0]
  def change
    add_column :timetable_cells, :player_key, :integer
    add_column :timetable_cells, :second_player_key, :integer
    add_column :tournaments, :registration_date, :date 
    remove_column :tournaments, :registeration_time
    rename_column :tournaments, :registration_date, :registeration_time
  end
end
