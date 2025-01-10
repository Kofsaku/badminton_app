# app/controllers/match_classes_controller.rb
class Api::V1::MatchClassesController < ApplicationController
  def index
    @match_classes = MatchClass.all

    render json: @match_classes.as_json(include: {
      tournament: {only: [:id, :name]},
      tournament_category: {only: [:id, :category_type]},
      tournament_division: {only:[:id, :division]}
    })
  end

  def create
    logger.info "this is match class params #{params[:class_data]}"
    @match_class = MatchClass.new(tournament_id: match_class_params[:tournament], tournament_category_id: match_class_params[:category], tournament_division_id: match_class_params[:division], size: match_class_params[:class_size])
    class_data = params[:class_data]

    if @match_class.save
      class_data.each_with_index do |match_round, round_index|
        @match_round = MatchRound.new(match_class_id: @match_class.id, round_number: round_index, round_type: match_round[:matchType], round_size: match_round[:tableCount], number_of_winners: match_round[:winnerCount])
        group_sizes = match_round[:numberOfPlayers]
        selected_venues = match_round[:selectedVenues]
        selected_players = match_round[:selectedPlayers]

        if @match_round.save
          group_sizes.each_with_index do |size, group_index|
            @match_group = MatchGroup.new(match_round_id: @match_round.id, group_number: group_index, group_size: size, tournament_venue_id: selected_venues[group_index])
            if @match_group.save
              selected_players_in_group = selected_players[group_index]
              selected_players_in_group.each do |selected_player|
                if round_index == 0
                  @group_player = GroupPlayer.new(match_group_id: @match_group.id, tournament_player_id: selected_player)
                  if @group_player.save
                  end
                else
                  @group_player = GroupPlayer.new(match_group_id: @match_group.id, player_key: selected_player)
                  if @group_player.save
                  end
                end
              end

              group_data = match_round[:tables][group_index]

              if round_index == 0
                group_data.each_with_index do |match_row, row_index|
                  match_row.each_with_index do |match_cell, col_index|
                    if col_index > row_index && match_cell
                      cell = TimetableCell.find_or_initialize_by(match_group_id: @match_group.id, tournament_venue_id: selected_venues[group_index], tournament_player_id: selected_players_in_group[row_index], second_tournament_player_id: selected_players_in_group[col_index])
                      cell.number = @match_group.id * 1000 + match_cell
          
                      unless cell.save
                        logger.error "error to save cell: #{cell.errors.full_messages}"
                      else
                        unless cell.match.present?
                          player1 = cell.tournament_player.player_type == "User" ? cell.tournament_player.player.full_name : cell.tournament_player.player.title
                          player2 = cell.second_tournament_player.player_type == "User" ? cell.second_tournament_player.player.full_name : cell.second_tournament_player.player.title
                          Match.create(timetable_cell_id: cell.id, match_type: "single", player1: player1, player2: player2)
                        end
                      end
                    end
                  end
                end
              end
            end
          end
        end
      end
      render json: {message: "success"}
    end
  end

  def destroy
    item = MatchClass.find(params[:id])
    item_attributes = item.attributes

    if item.destroy
      render json: { message: 'Item successfully deleted', item: item_attributes }
    else
      render json: { error: 'Failed to delete item' }, status: :unprocessable_entity
    end
  end

  def match_class_params
    params.permit(:tournament, :category, :division, :class_size)
  end
end
