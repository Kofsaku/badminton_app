class Api::V1::TournamentTablesController < ApplicationController
  before_action :set_tournament_table, only: %i[getTournamentTableById updateTournamentTableById deleteTournamentTableById]

  def getAllTournamentTables
    @tournament_tables = TournamentTable.includes(:tournament, :tournament_category, :tournament_division).all
    render json: @tournament_tables.as_json(include: {
      tournament: {only: [:id, :name]},
      tournament_category: {only: [:id, :category_type]},
      tournament_division: {only:[:id, :division]}
    })
  end

  def addNewTournamentTable
    @timetable = Timetable.find_by(tournament_id: tournament_table_params[:tournament_id], tournament_venue_id: tournament_table_params[:tournament_venue_id])
    
    if @timetable.present?
      if tournament_table_params[:table_type] == "league"
        @round_robin_table = RoundRobinTable.new(tournament_table_params.merge(timetable_id: @timetable.id))
        if @round_robin_table.save
          render json: {id: @round_robin_table.id, message: "league table successfully created"}
        else
          logger.info "#{@round_robin_table.errors.full_messages}"
          render json: {message: "failed"}, status: :bad_request
        end
      else
        @knockout_table = KnockoutTable.new(tournament_table_params.merge(timetable_id: @timetable.id))
        if @knockout_table.save
          render json: {id: @knockout_table.id, message: "tournament table successfully created"}
        else
          logger.info "#{@knockout_table.errors.full_messages}"
          render json: {message: "failed"}, status: :bad_request
        end
      end
    else
      new_timetable = Timetable.new(tournament_id: tournament_table_params[:tournament_id], tournament_venue_id: tournament_table_params[:tournament_venue_id])
      if new_timetable.save
        if tournament_table_params[:table_type] == "league"
          @round_robin_table = RoundRobinTable.new(tournament_table_params.merge(timetable_id: new_timetable.id))
          if @round_robin_table.save
            render json: {id: @round_robin_table.id, message: "league table successfully created"}
          end
        else
          @knockout_table = KnockoutTable.new(tournament_table_params.merge(timetable_id: new_timetable.id))
          if @knockout_table.save
            render json: {id: @knockout_table.id, message: "tournament table successfully created"}
          else
            logger.info "#{@knockout_table.errors.full_messages}"
            render json: {message: "failed"}, status: :bad_request
          end
        end
      end
    end
  end

  def getTournamentTableById
    table = @tournament_table.as_json(include:{
      tournament: {only: [:id, :name]},
      tournament_venue: {only: [:id, :venue_name, :venue_date]},
      tournament_category: {only: [:id, :category_type]},
      tournament_division: {only: [:id, :division]},
      tournament_table_players: {only: [:id, :tournament_player_id]}
    })
    players = @tournament_table.tournament.tournament_players
    numbers = @tournament_table.timetable.timetable_cells

    render json: {table: table, players: players, match_numbers: numbers}
  end

  def updateTournamentTableById
    selected_players = params[:players]
    match_numbers = params[:match_numbers]
    logger.info "this is tournament table params #{tournament_table_params} #{selected_players} #{match_numbers}"

    if @tournament_table.update(tournament_table_params)
      if selected_players.is_a?(Array)
        selected_players.each do |player_id|
          unless @tournament_table.tournament_table_players.exists?(tournament_player_id: player_id)
            @tournament_table.tournament_table_players.create(tournament_player_id: player_id)
          end
        end

        @tournament_table.tournament_table_players.where.not(tournament_player_id: selected_players).destroy_all
      end

      match_numbers.each_with_index do |match_row, row_index|
        match_row.each_with_index do |match_cell, col_index|
          if col_index > row_index && match_cell
            cell = @tournament_table.timetable_cells.find_or_initialize_by(timetable_id: @tournament_table.timetable.id, tournament_player_id: selected_players[row_index], second_tournament_player_id: selected_players[col_index])
            cell.number = @tournament_table.id * 1000 + match_cell

            unless cell.save
              logger.error "error to save cell: #{cell.errors.full_messages}"
            end
          end
        end
      end

      render json: {message: "table updated successfully", table: @tournament_table}
    end
  end

  def deleteTournamentTableById
    if @tournament_table.delete
      render json: {message: "table deleted successfully"}
    end
  end

  private

  def tournament_table_params
    params.permit(:name, :table_type, :tournament_id, :tournament_venue_id, :tournament_category_id, :tournament_division_id, :size, :bracket_direction)
  end

  def set_tournament_table
    @tournament_table = TournamentTable.includes(:tournament, :tournament_venue, :tournament_category, :tournament_division).find(params[:id])
  end
end
