class Api::V1::TournamentsController < ApplicationController
  before_action :set_tournament, only: %i[get_venues_by_tournament_id get_tournament_data_by_id]

  def get_all_tournaments
    @tournaments = Tournament.all
    render json: @tournaments
  end

  def get_tournaments_by_query
    search_params = params.permit(:name, :classification, :region, :prefecture, :start_date, :end_date, :status, :region, :venue, :match_format, :participation_type)

    @tournaments = Tournament.all
    @tournaments = @tournaments.where('name' => search_params[:name]) if search_params[:name] != ""
    # @tournaments = @tournaments.where('event_category' => search_params[:classification]) if search_params[:classification] != "all"
    @tournaments = @tournaments.where('region' => search_params[:region]) if search_params[:region] != "all"
    logger.info "hello how are you #{search_params[:prefecture]}"
    
    @tournaments = @tournaments.where('prefecture' => search_params[:prefecture]) if search_params[:prefecture] != ""

    if search_params[:start_date] == ""
      if search_params[:end_date] != ""
        @tournaments = @tournaments.where('event_date <= ?', search_params[:end_date])
      end
    else
      if search_params[:end_date] == ""
        @tournaments = @tournaments.where('event_date >= ?', search_params[:start_date])
      else
        @tournaments = @tournaments.where(event_date: search_params[:start_date]..search_params[:end_date]) 
      end
    end

    if search_params[:match_format] == "single"
      @tournaments = @tournaments.joins(:tournament_categories).where('tournament_categories.category_type LIKE ?', '%シングルス%').distinct
    elsif search_params[:match_format] == "double"
      @tournaments = @tournaments.joins(:tournament_categories).where('tournament_categories.category_type LIKE ?', '%ダブルス%').distinct
    elsif search_params[:match_format] == "team"
      @tournaments = @tournaments.joins(:tournament_categories).where('tournament_categories.category_type LIKE ?', '%団体%').distinct
    end

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
      tournament_players: @tournament_players.as_json(include: {
        player: {only: %i[id full_name title]}
      }),
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
