class Api::V1::TournamentsController < ApplicationController
  before_action :set_tournament, only: %i[get_venues_by_tournament_id get_tournament_data_by_id]

  def get_all_tournaments
    @tournaments = Tournament.all
    render json: @tournaments
  end

  def get_venues_by_tournament_id
    @tournament_venues = @tournament.tournament_venues
    render json: @tournament_venues
  end

  def get_tournament_data_by_id
    @tournament_players = @tournament.tournament_players
    @tournament_venues = @tournament.tournament_venues
    @tournament_categories = @tournament.tournament_categories

    combined_json = {
      tournament_players: @tournament_players,
      tournament_venues: @tournament_venues,
      tournament_categories: @tournament_categories
    }.to_json

    render json: combined_json
  end

  private

  def set_tournament
    @tournament = Tournament.find(params[:id])
  end
end
