class TournamentTablesController < ApplicationController
  before_action :set_tournament_table, only: [:show, :edit, :update, :destroy, :assign_player]

  # List all tournament tables
  def index
    @tournament_tables = TournamentTable.includes(:tournament, :tournament_category, :tournament_division).order(:created_at)
  end

  # Show a specific table
  def show
    @players = @tournament_table.tournament_players
  end

  # Initialize a new RoundRobinTable
  def new_round_robin
    @round_robin_table = RoundRobinTable.new
  end

  # Initialize a new KnockoutTable
  def new_knockout
    @knockout_table = KnockoutTable.new
  end

  # Assign a player or team to a table
  def assign_player
    player = TournamentPlayer.find(params[:player_id])
    if @tournament_table.tournament_players.include?(player)
      redirect_to @tournament_table, alert: "Player already assigned."
    else
      @tournament_table.tournament_players << player
      redirect_to @tournament_table, notice: "Player assigned successfully."
    end
  end

  # Create RoundRobinTable
  def create_round_robin
    @round_robin_table = RoundRobinTable.new(tournament_table_params)
    if @round_robin_table.save
      redirect_to tournament_table_url(@round_robin_table), notice: "Round robin table created successfully."
    else
      render :new_round_robin
    end
  end

  # Create KnockoutTable
  def create_knockout
    @knockout_table = KnockoutTable.new(tournament_table_params)
    if @knockout_table.save
      redirect_to tournament_table_url(@knockout_table), notice: "Knockout table created successfully."
    else
      render :new_knockout
    end
  end

  def update
    if @tournament_table.update(update_table_params.slice(:name, :size, :bracket_direction))
      if update_table_params[:player_ids].present?
        @tournament_table.tournament_players = TournamentPlayer.where(id: update_table_params[:player_ids])
      end

      redirect_to @tournament_table, notice: "Tournament table updated successfully."
    else
      flash.now[:alert] = @tournament_table.errors.full_messages.to_sentence
      render :edit
    end
  end
  
  private

  # Strong parameters for tournament tables
  def tournament_table_params
    if params[:knockout_table]
      params.require(:knockout_table).permit(:name, :tournament_id, :tournament_category_id, :tournament_division_id, :size, :bracket_direction, :table_type)
    elsif params[:round_robin_table]
      params.require(:round_robin_table).permit(:name, :tournament_id, :tournament_category_id, :tournament_division_id, :size, :table_type)
    else
      raise ActionController::ParameterMissing, 'No valid table type parameter found'
    end
  end

  def update_table_params
    params.require(:tournament_table).permit(:name, :size, :bracket_direction, player_ids: [])
  end

  # Set a specific tournament table
  def set_tournament_table
    @tournament_table = TournamentTable.find(params[:id])
  end
end
