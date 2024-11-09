class AddMemoToTimetables < ActiveRecord::Migration[7.0]
  def change
    add_column :timetables, :memo, :text
  end
end
