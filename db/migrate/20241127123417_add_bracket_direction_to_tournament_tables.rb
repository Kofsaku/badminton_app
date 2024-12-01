class AddBracketDirectionToTournamentTables < ActiveRecord::Migration[7.0]
  def change
    add_column :tournament_tables, :bracket_direction, :integer # For KnockoutTables
  end
end
