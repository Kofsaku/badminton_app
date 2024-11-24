class TournamentsController < ApplicationController
  include Authenticable
  #before_action :authorize_request
  before_action :set_tournament, only: %i[ show edit update destroy ]

  # GET /tournaments or /tournaments.json
  def index
    @tournaments = Tournament.page(params[:page]).per(params[:per_page] || 50)
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
    @tournaments = Tournament.all.select(:id, :name)
    render json: {
      tournaments: @tournaments
    }
  end

  # GET /tournaments/1 or /tournaments/1.json
  def show
    render json: { tournament: @tournament }
  end

  # GET /tournaments/new
  def new
    @tournament = Tournament.new
  end

  def add_player
    TournamentPlayer.create!(player_id: params["player_id"], player_type: "User", tournament_id: params["tournament_id"])

    render json: { success: true }
  end

  # GET /tournaments/1/edit
  def edit
  end

  # POST /tournaments or /tournaments.json
  def create
    @tournament = Tournament.new(tournament_params)

    if @tournament.save!
      render json: { tournament: @tournament, message: 'Tournament created successfully' }, status: :created
    else
      render json: { errors: tournament.errors.full_messages }, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tournaments/1 or /tournaments/1.json
  def update
    respond_to do |format|
      if @tournament.update(tournament_params)
        format.html { redirect_to tournament_url(@tournament), notice: "Tournament was successfully updated." }
        format.json { render :show, status: :ok, location: @tournament }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @tournament.errors, status: :unprocessable_entity }
      end
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

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_tournament
      @tournament = Tournament.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
   def tournament_params
    params.require(:tournament).permit(
      :name,                           # t.string "name"
      :event_date,                     # t.date "event_date"
      :registeration_time,              # t.time "registeration_time" (corrected spelling)
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
      :entry_in_multiple_events,        # t.string "entry_in_multiple_events"
      :cancellation_after_application,  # t.string "cancellation_after_application"
      :participation_fee,               # t.string "participation_fee"
      :announcements,                   # t.string "announcements"
      :organizers_url,                  # t.string "organizers_url"
      :inquiry_contact_information,     # t.string "inquiry_contact_information"
      :notes_for_organizers,
      :user_id,
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
      ],
      tournament_players_attributes: [
        :id, :user_id, :status, :_destroy
      ],
      tournament_venues_attributes: [
        :id, :venue_name, :venue_address, :no_of_courts, :venue_date, :_destroy
      ]
    )
  end

end
