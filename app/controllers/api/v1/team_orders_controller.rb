module Api
  module V1
    class TeamOrdersController < ApplicationController
      def index
        @tournament_player = TournamentPlayer.find(params[:tournament_player_id])
        @team_orders = @tournament_player.team_orders.includes(:team_player)
        render json: @team_orders
      end

      def available_players
        @tournament_player = TournamentPlayer.find(params[:tournament_player_id])
        @available_players = @tournament_player.player.team_players
        render json: @available_players
      end

      def create
        @tournament_player = TournamentPlayer.find(params[:tournament_player_id])
        
        ActiveRecord::Base.transaction do
          # Clear existing orders
          @tournament_player.team_orders.destroy_all
          
          # Create new orders
          params[:order].each_with_index do |player_id, index|
            next if player_id.blank?
            
            TeamOrder.create!(
              tournament_player: @tournament_player,
              team_player_id: player_id,
              order_number: index + 1
            )
          end
          
          @tournament_player.update!(status: '入力完了')
        end
        
        render json: { message: 'オーダー表が保存されました' }, status: :created
      rescue ActiveRecord::RecordInvalid => e
        render json: { error: e.message }, status: :unprocessable_entity
      end
    end
  end
end 