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
        match_type = match_round[:matchType]

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
                  else
                    logger.error "error to save player: #{@group_player.errors.full_messages}" 
                  end
                end
              end

              if !match_type
                group_data = match_round[:tables][group_index]

                if round_index == 0
                  group_data.each_with_index do |match_row, row_index|
                    match_row.each_with_index do |match_cell, col_index|
                      if col_index > row_index && match_cell != 0
                        cell = TimetableCell.find_or_initialize_by(match_group_id: @match_group.id, tournament_venue_id: selected_venues[group_index], tournament_player_id: selected_players_in_group[row_index], second_tournament_player_id: selected_players_in_group[col_index])
                        cell.number = match_cell
            
                        unless cell.save
                          logger.error "error to save cell: #{cell.errors.full_messages}"
                        else
                          unless cell.match.present?
                            logger.info "this is tournament player #{cell.inspect}"
                            player1 = cell.tournament_player.player_type == "User" ? cell.tournament_player.player.full_name : cell.tournament_player.player.title
                            player2 = cell.second_tournament_player.player_type == "User" ? cell.second_tournament_player.player.full_name : cell.second_tournament_player.player.title
                            Match.create(timetable_cell_id: cell.id, match_type: "single", player1: player1, player2: player2)
                          end
                        end
                      end
                    end
                  end
                else
                  group_data.each_with_index do |match_row, row_index|
                    match_row.each_with_index do |match_cell, col_index|
                      if col_index > row_index && match_cell != 0
                        cell = TimetableCell.find_or_initialize_by(match_group_id: @match_group.id, tournament_venue_id: selected_venues[group_index], player_key: selected_players_in_group[row_index], second_player_key: selected_players_in_group[col_index])
                        cell.number = round_index * 1000 + match_cell
            
                        unless cell.save
                          logger.error "error to save cell: #{cell.errors.full_messages}"
                        else
                          unless cell.match.present?
                            @prev_round = MatchRound.find_by(round_number: round_index - 1)

                            player1_group = ("A".ord + cell.player_key / @prev_round.number_of_winners).chr
                            player1_no = cell.player_key % @prev_round.number_of_winners + 1
                            player1 = "#{player1_group}-#{player1_no}"

                            player2_group = ("A".ord + cell.second_player_key / @prev_round.number_of_winners).chr
                            player2_no = cell.second_player_key % @prev_round.number_of_winners + 1
                            player2 = "#{player2_group}-#{player2_no}"
                            Match.create(timetable_cell_id: cell.id, match_type: "single", player1: player1, player2: player2)
                          end
                        end
                      end
                    end
                  end
                end
              else
                group_data = match_round[:tables][group_index]

                if round_index == 0
                  group_data.each_with_index do |match_row, row_index|
                    match_row.each_with_index do |match_cell, col_index|
                      if match_cell != 0
                        cell = TimetableCell.find_or_initialize_by(match_group_id: @match_group.id, tournament_venue_id: selected_venues[group_index], number: match_cell)
                        
                        if row_index == 0
                          cell.tournament_player_id = selected_players_in_group[col_index * 2]
                          cell.second_tournament_player_id = selected_players_in_group[col_index * 2 + 1]

                          if cell.save
                            match = Match.find_or_initialize_by(timetable_cell_id: cell.id, match_type: "single")
                            player1 = cell.tournament_player.player_type == "User" ? cell.tournament_player.player.full_name : cell.tournament_player.player.title
                            player2 = cell.second_tournament_player.player_type == "User" ? cell.second_tournament_player.player.full_name : cell.second_tournament_player.player.title
                            match.player1 = player1
                            match.player2 = player2

                            match.save
                          else
                            logger.info "error to save cell #{cell.errors.full_messages}"
                          end
                        else
                          cell.player_key = group_data[row_index - 1][col_index * 2]
                          cell.second_player_key = group_data[row_index - 1][col_index * 2 + 1]

                          if cell.save
                            match = Match.find_or_initialize_by(timetable_cell_id: cell.id, match_type: "single")
                            player1 = "Number #{cell.player_key}"
                            player2 = "Number #{cell.second_player_key}"
                            match.player1 = player1
                            match.player2 = player2

                            match.save
                          else
                            logger.info "error to save cell #{cell.errors.full_messages}"
                          end
                        end
                      end
                    end
                  end
                else
                  group_data.each_with_index do |match_row, row_index|
                    match_row.each_with_index do |match_cell, col_index|
                      if match_cell != 0
                        cell = TimetableCell.find_or_initialize_by(match_group_id: @match_group.id, tournament_venue_id: selected_venues[group_index], number: round_index * 1000 + match_cell)
                        
                        if row_index == 0
                          cell.player_key = selected_players_in_group[col_index * 2]
                          cell.second_player_key = selected_players_in_group[col_index * 2 + 1]

                          if cell.save
                            match = Match.find_or_initialize_by(timetable_cell_id: cell.id, match_type: "single")
                            @prev_round = MatchRound.find_by(round_number: round_index - 1)

                            player1_group = ("A".ord + cell.player_key / @prev_round.number_of_winners).chr
                            player1_no = cell.player_key % @prev_round.number_of_winners + 1
                            player1 = "#{player1_group}-#{player1_no}"

                            player2_group = ("A".ord + cell.second_player_key / @prev_round.number_of_winners).chr
                            player2_no = cell.second_player_key % @prev_round.number_of_winners + 1
                            player2 = "#{player2_group}-#{player2_no}"

                            match.player1 = player1
                            match.player2 = player2

                            match.save
                          else
                            logger.info "error to save cell #{cell.errors.full_messages}"
                          end
                        else
                          cell.player_key = group_data[row_index - 1][col_index * 2]
                          cell.second_player_key = group_data[row_index - 1][col_index * 2 + 1]

                          if cell.save
                            match = Match.find_or_initialize_by(timetable_cell_id: cell.id, match_type: "single")
                            player1 = "Number #{cell.player_key}"
                            player2 = "Number #{cell.second_player_key}"
                            match.player1 = player1
                            match.player2 = player2

                            match.save
                          else
                            logger.info "error to save cell #{cell.errors.full_messages}"
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
      end
      render json: {message: "success"}
    end
  end

  def show
    @match_class = MatchClass.find(params[:id])

    render json: @match_class.as_json(include: {
      tournament: {
        only: [:id, :name]
      },
      tournament_category: {only: [:id, :category_type]},
      tournament_division: {only:[:id, :division]},
      match_rounds: {
        include: {
          match_groups: {
            include: {
              group_players: {
                include: {
                  tournament_player: {
                    only: [],
                    include: {
                      player: {
                        only: [:id, :full_name, :title]
                      }
                    }
                  }
                }
              },
              timetable_cell: {
                include: {
                  match: {}
                }
              },
              tournament_venue: {}
            }, except: [
              :tournament_venue_id
            ]
          } 
        }
      }
    }, except: [
      :tournament_id,
      :tournament_category_id,
      :tournament_division_id
    ])
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
