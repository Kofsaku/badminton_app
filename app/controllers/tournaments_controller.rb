class TournamentsController < ApplicationController
  include Authenticable
  before_action :authorize_request
  before_action :set_tournament, only: %i[ show edit update destroy]

  # GET /tournaments or /tournaments.json
  def index
    @tournaments = Tournament.where(user_id: current_user.id)
                           .page(params[:page])
                           .per(params[:per_page] || 50)
    render json: {
      tournaments: @tournaments,
      current_page: @tournaments.current_page,
      total_pages: @tournaments.total_pages,
      total_count: @tournaments.total_count
    }
  end

  def tournament_management
  end

  def tournament_ids
    @tournaments = Tournament.where(user_id: session[:current_user_id]).select(:id, :name)
    render json: {
      tournaments: @tournaments
    }
  end

  def tournament_categories
    @tournament = Tournament.find(params["tournament_id"])
    tournament_categories = @tournament.tournament_categories.pluck(:id, :category_type)
    render json: {
      tournament_categories: tournament_categories
    }
  end

  def tournament_divisions
    @tournament = Tournament.find(params["tournament_id"])
    categories = @tournament.tournament_categories.pluck(:id)
    tournament_divisions = TournamentDivision.where('tournament_category_id IN (?)', categories).pluck(:id, :division)
    render json: {
      tournament_divisions: tournament_divisions
    }
  end

  # GET /tournaments/1 or /tournaments/1.json
  def show
    render json: {
      tournament: show_full_data(@tournament)
    }
  end

  # GET /tournaments/new
  def new
    @tournament = Tournament.new
  end

  def add_player
    TournamentPlayer.create!(player_id: params["player_id"], player_type: "User", tournament_id: params["tournament_id"])

    render json: { success: true }
  end

  def add_new_player
    begin
      ActiveRecord::Base.transaction do
        player = params["player"]
        user = User.create!(email: player["email"], full_name: player["name"], password: "password")
        Profile.create!(role: "Player", user_id: user.id, gender: player["gender"], date_of_birth: player["date_of_birth"], years_of_experience: player["years_of_experience"], age: player["age"])
        TournamentPlayer.create!(player_id: user.id, player_type: "User", tournament_id: params["tournament_id"], tournament_category_id: player["tournament_category_id"], tournament_division_id: player["tournament_division_id"])
      end

      render json: { success: true }
    rescue => e
      render json: { success: false, error: e.message }, status: :unprocessable_entity
    end
  end

  def remove_player_from_tournament
    ActiveRecord::Base.transaction do
      player = TournamentPlayer.find_by(player_id: params[:player_id], tournament_id: params[:tournament_id])
      player.destroy!
    rescue ActiveRecord::RecordInvalid => e
      render json: { success: false, error: e.message }, status: :unprocessable_entity
    end

    render json: { success: true }
  end

  def add_new_team
    begin
      ActiveRecord::Base.transaction do
        team = Team.create!(title: params["team"]["teamName"], members_count: params["team"]["numberOfPlayers"])

        params["team"]["players"].each do |player|
          user = User.find_by(email: player["email"])

          user = User.create!(email: player["email"] , full_name: player["name"], password: "password") if user.blank?
          user.create_profile!(role: "Player", age: player["age"], gender: player["gender"]) if user.profile.blank?

          team.team_players.create!(user_id: user.id)
        end

        TournamentPlayer.create!(player_id: team.id, player_type: "Team", tournament_id: params["tournament_id"], tournament_category_id: params["team"]["tournament_category_id"], tournament_division_id: params["team"]["tournament_division_id"])
      end

      render json: { success: true }
    rescue => e
      render json: { success: false, error: e.message }, status: :unprocessable_entity
    end
  end

  # GET /tournaments/1/edit
  def edit
  end

  # POST /tournaments or /tournaments.json
  def create
    @tournament = current_user.tournament.build(tournament_params)

    binding.pry
    if @tournament.save!
      render json: { tournament: @tournament, message: 'Tournament created successfully' }, status: :created
    else
      render json: { errors: @tournament.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tournaments/1 or /tournaments/1.json
  def update
    if @tournament.update(tournament_params)
      render json: { tournament: @tournament, message: 'Tournament updated successfully.' }, status: :ok
    else
      render json: { errors: @tournament.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # DELETE /tournaments/1 or /tournaments/1.json
  def destroy
    @tournament.destroy

    respond_to do |format|
      format.html { redirect_to tournaments_url, notice: "Tournament was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  def categories
    tournament = Tournament.find(params[:tournament_id])
    categories = tournament.tournament_categories
    render json: { categories: categories.as_json(only: [:id, :category_type]) }
  end

  private
    # Use callbacks to share common setup or constraints between actions.
  def set_tournament
    @tournament = Tournament.find(params[:id])
  end

    # Only allow a list of trusted parameters through.
  def tournament_params
    params.require(:tournament).permit(
      :name,                           # t.string "name"
      :region,
      :prefecture,
      :event_date,                     # t.date "event_date"
      :registeration_time,              # t.date "registeration_time" (corrected spelling)
      :organization_name,               # t.string "organization_name"
      :payment_method,                  # t.string "payment_method"
      :match_start_time,                # t.time "match_start_time"
      :match_end_time,                  # t.time "match_end_time"
      :match_overview,                  # t.string "match_overview"
      :organizer,                       # t.string "organizer"
      :administrator,                   # t.string "administrator"
      :sponsor,                         # t.string "sponsor"
      :event_category,                  # t.string "event_category"
      :days_schedule,                   # t.string "days_schedule"
      :max_participants,                # t.integer "max_participants"
      :reception_period,                # t.string "reception_period"
      :competition_format,              # t.string "competition_format"
      :competition_rules,               # t.text "competition_rules"
      :ball_type,                       # t.string "ball_type"
      :participation_eligibility,        # t.string "participation_eligibility"
      :participation_payment_method,    # t.string "participation_payment_method"
      :application_method,              # t.string "application_method"
      :application_deadline,            # t.string "application_deadline"
      :pairing_selection_method,        # t.string "pairing_selection_method"
      :award_details,                   # t.text "award_details"
      :presence_of_member_changes,
      :entry_in_multiple_events,        # t.string "entry_in_multiple_events"
      :cancellation_after_application,  # t.string "cancellation_after_application"
      :participation_fee,               # t.string "participation_fee"
      :announcements,                   # t.string "announcements"
      :organizers_url,                  # t.string "organizers_url"
      :inquiry_contact_information,     # t.string "inquiry_contact_information"
      :notes_for_organizers,
      :user_id,
      :costume_detail,
      :description,
      :transport_information,
      :note_for_participants,
      :banner,
      tournament_categories_attributes: [
        :id,
        :category_type,
        :is_league,                       # t.boolean "is_league"
        :is_tournament,                   # t.boolean "is_tournament"
        :number_of_games,                 # t.string "number_of_games"
        :score,                           # t.integer "score"
        :time_limit,                      # t.float "time_limit"
        :break_point,                     # t.integer "break_point"
        :interval_duration,               # t.float "interval_duration"
        :points_limit,                    # t.integer "points_limit"
        :division_name_type,              # t.string "division_name_type"
        :division_number,                 # t.integer "division_number"
        :switch_during_game,              # t.boolean "switch_during_game", default: true
        :switch_score_during_game,        # t.integer "switch_score_during_game", default: 11
        :switch_between_games,            # t.boolean "switch_between_games"
        :match_composition,               # t.string "match_composition"
        :match_facilitator,
        :show_score,
        :show_intervals,
        :show_time_limit,
        tournament_divisions_attributes: [
          :id, :division, :_destroy
        ],
        games: [
          :interval_duration,
          :switch_ends,
          :switch_score_during_game
        ]
      ],
      tournament_players_attributes: [
        :id, :user_id, :status, :_destroy
      ],
      tournament_venues_attributes: [
        :id,
        :venue_name, 
        :venue_address, 
        :no_of_courts, 
        :venue_date, 
        :division_number, 
        :_destroy,
        category_type: [], 
      ]
    )
  end

  def show_full_data(tournament)
    tournament.attributes.merge(
      tournament_categories_attributes: tournament_categories_data(tournament),
      tournament_venues_attributes: tournament.tournament_venues.map(&:attributes)
    )
  end

  def tournament_categories_data(tournament)
    tournament.tournament_categories
              .map do |category|
                category.attributes.merge(
                  tournament_divisions_attributes: category.tournament_divisions
                                                           .map(&:attributes)
                )
              end
  end
end
