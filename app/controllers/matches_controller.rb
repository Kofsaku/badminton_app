class MatchesController < ApplicationController
  before_action :set_match, only: %i[show add_log complete update]

  def index; end

  def new; end

  def scoreboard; end

  def all
    matches = Match.all

    render json: matches
  end

  def show
    render json: @match
  end

  def create
    match = Match.new(match_params)
    match.status = 'pending'
    if match.save
      render json: match, status: :created
    else
      render json: { errors: match.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    rally_log = params[:match_log]
    @match.update(match_log: rally_log.to_json)

    if @match.update(match_upate_params)
      render json: @match, status: :created
    else
      render json: { errors: @match.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def add_log
    rally_log = params[:log]
    if @match.match_log.present?
      logs = JSON.parse(@match.match_log)
      logs << rally_log
      @match.update(match_log: logs.to_json)
    else
      @match.update(match_log: [rally_log].to_json)
    end
    render json: @match
  end

  def complete
    winner = params[:winner]
    if @match.update(status: 'completed', winner: winner)
      render json: @match
    else
      render json: { errors: @match.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_match
    @match = Match.find(params[:id])
  end

  def match_params
    params.require(:match).permit(:match_type, :player1, :player2, :player3, :player4)
  end

  def match_upate_params
    params.permit(:status, :winner, :match_time, :match_score_teamA, :match_score_teamB)
  end
end
