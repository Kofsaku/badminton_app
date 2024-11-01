class RemoveMemoFromTimetables < ActiveRecord::Migration[7.0]
  def change
    remove_column :timetables, :memo, :string
  end
end
