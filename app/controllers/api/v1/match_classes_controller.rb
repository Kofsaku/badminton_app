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
        @match_round = MatchRound.new(match_class_id: @match_class.id, round_number: round_index, round_type: 0, round_size: match_round[:tableCount], number_of_winners: match_round[:winnerCount])
        group_sizes = match_round[:numberOfPlayers]
        selected_players = match_round[:selectedPlayers]

        if @match_round.save
          group_sizes.each_with_index do |size, group_index|
            @match_group = MatchGroup.new(match_round_id: @match_round.id, group_number: group_index, group_size: size, tournament_venue_id: 1)
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
            end
          end
        end
      end
      render json: {message: "success"}
    end
  end

  def match_class_params
    params.permit(:tournament, :category, :division, :class_size)
  end
end
