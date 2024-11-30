# db/migrate/[timestamp]_rename_tournament_categories_id_in_tournament_divisions.rb
class RenameTournamentCategoriesIdInTournamentDivisions < ActiveRecord::Migration[7.0]
  def change
    rename_column :tournament_divisions, :tournament_categories_id, :tournament_category_id
  end
end
