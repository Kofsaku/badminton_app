class TeamOrdersController < ApplicationController
  before_action :set_tournament_player
  
  def index
    @team_orders = @tournament_player.team_orders.includes(:team_player)
    @available_players = @tournament_player.player.team_players
  end

  def create
    ActiveRecord::Base.transaction do
      params[:order].each_with_index do |player_id, index|
        TeamOrder.create!(
          tournament_player: @tournament_player,
          team_player_id: player_id,
          order_number: index + 1
        )
      end
      @tournament_player.update!(status: '入力完了')
    end
    
    redirect_to team_orders_path, notice: 'オーダー表が保存されました'
  rescue ActiveRecord::RecordInvalid
    redirect_to team_orders_path, alert: '保存に失敗しました'
  end

  private

  def set_tournament_player
    @tournament_player = TournamentPlayer.find(params[:tournament_player_id])
  end
end
