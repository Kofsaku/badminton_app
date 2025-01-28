class AddGamesToTournamentCategories < ActiveRecord::Migration[7.0]
  def change
    add_column :tournament_categories, :games, :jsonb, default: [], null: false
  end
end
