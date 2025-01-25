class AddChangesToTournamentCategory < ActiveRecord::Migration[7.0]
  def change
    add_column :tournament_categories, :number_of_members, :integer 
  end
end
