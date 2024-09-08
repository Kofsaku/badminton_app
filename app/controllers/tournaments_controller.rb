class TournamentsController < ApplicationController
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

  # GET /tournaments/1 or /tournaments/1.json
  def show
    render json: { tournament: @tournament }
  end

  # GET /tournaments/new
  def new
    @tournament = Tournament.new
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
      :name,
      :event_date,
      :registration_start_time, # Corrected key
      :organization_name,
      :payment_method,
      :match_start_time,
      :match_end_time,           # This should also be permitted
      :match_overview,
      :organizer,
      :administrator,
      :sponsor,
      :event_category,
      :days_schedule,
      :reception_period,
      :competition_format,
      :max_participants,         # Corrected key from 'capacity' if needed
      :competition_rules,
      :ball_type,
      :participation_eligibility,
      :participation_payment_method,
      :application_method,
      :application_deadline,
      :pairing_selection_method,
      :award_details,
      :member_changes,           # Added this to the correct key
      :entry_in_multiple_events,
      :cancellation_after_application,
      :participation_fee,
      :inquiry_contact_information,
      :announcements,
      :organizers_url,
      :notes_for_organizers,
      :is_league,
      :is_tournament,
      :game_number,
      :score,
      :time_limit,
      :break_point,
      :interval_duration,
      :points_limit,
      :change_ends,
      :division_number,
      :user_id,
      tournament_divisions_attributes: [
        :id, :division, :participants_limit, :_destroy
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
