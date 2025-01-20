class MatchesController < ApplicationController
  before_action :set_match, only: %i[show add_log complete update match_order reorder_team_match]

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
    status = params[:status]

    @match.update(match_log: rally_log.to_json, status: status)
    
    if status == "completed"
      rally_log.each do |log|
        if log[:match_score_teamA] > log[:match_score_teamB]
          @match.match_score_teamA += 1
        else
          @match.match_score_teamB += 1
        end
      end
    end

    if @match.save
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

  def team_matches
    matches = current_user.teams.flat_map(&:matches)
    render json: build_team_matches_data(matches)
  end

  def display_all_team_matches
    teams = current_user.teams
    render json: build_detailed_team_matches_data(teams)
  end

  def match_order
    current_team = @match.timetable_cell.teams.find { |team| current_user.teams.include?(team) }
    opponent = @match.timetable_cell.tournament_player_id == current_team.id ?
                  @match.timetable_cell.second_tournament_player.player :
                  @match.timetable_cell.tournament_player.player

    team_members = current_team.users.map do |user|
      user_order = user.team_match_orders.find_by(match: @match, team: current_team)
      user.as_json.merge(order: {
        id: user_order&.id,
        order: user_order&.order
      })
    end

    render json: {
      match: @match.as_json,
      timetable_cell: @match.timetable_cell.as_json,
      team: current_team.as_json,
      opponent: opponent.as_json,
      team_members: team_members
    }
  end

  def reorder_team_match
    ActiveRecord::Base.transaction do
      @match.update!(match_params)
    rescue ActiveRecord::RecordInvalid => e
      render json: { error: true, message: e.full_messages }
    end
  end

  private

  def set_match
    @match = Match.find(params[:id])
  end

  def match_params
    params.require(:match).permit(
      :match_type, :player1, :player2, :player3, :player4, :number_of_sets, :winning_points,
      team_match_orders_attributes: %i[
        id user_id team_id order
      ]
    )
  end

  def match_upate_params
    params.permit(:status, :winner, :match_time, :match_score_teamA, :match_score_teamB)
  end

  def build_team_matches_data(matches)
    matches.map do |match|
      current_team = match.timetable_cell.teams.find { |team| current_user.teams.include?(team) }
      current_team_match_orders = current_team.team_match_orders.where(match: match)
      participating_teams = match.timetable_cell.teams
      match.as_json.merge(
        members: participating_teams.flat_map { |team| team.users.flat_map(&:full_name) }.join('、'),
        input_status: current_team_match_orders.present? && current_team_match_orders.length == current_team.users.length ? '入力完了' : '未入力'
      )
    end
  end

  def build_detailed_team_matches_data(teams)
    teams.flat_map(&:timetable_cells).map do |timetable_cell|
      tournament = timetable_cell.tournament_venue.tournament
      match_round = timetable_cell.match_group.match_round

      matches_data = match_round.match_groups.map do |group|
        timetable_cell_mapping = group.timetable_cells.map do |cell|
          {
            timetable_cell: cell.as_json,
            first_team_name: cell.tournament_player.player.title,
            second_team_member: cell.second_tournament_player.player.title,
            first_team_members: cell.tournament_player.player.ordered_members(cell.match).as_json,
            second_team_member: cell.second_tournament_player.player.ordered_members(cell.match).as_json
          }
        end
      end

      {
        timetable_cell: timetable_cell.as_json,
        tournament: tournament.as_json.merge(number_of_tables: match_round.match_groups.count),
        tournament_venue: timetable_cell.tournament_venue.as_json,
        match_round: match_round.as_json.merge(details: matches_data)
      }
    end
  end
end
