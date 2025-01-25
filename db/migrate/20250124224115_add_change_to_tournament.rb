class AddChangeToTournament < ActiveRecord::Migration[7.0]
  def change
    add_column :tournaments, :description, :text
    add_column :tournaments, :costume_detail, :string
    add_column :tournaments, :transport_information, :string
    add_column :tournaments, :note_for_participants, :text
    add_column :tournaments, :banner, :string
  end
end
