# app/controllers/tournament_tables_controller.rb
class TournamentTablesController < ApplicationController
  before_action :set_tournament_table, only: [:show, :edit, :update, :destroy]

  # 一覧表示
  def index
    @tournament_tables = TournamentTable.includes(:tournament, :tournament_category, :tournament_division).order(:created_at)
  end

  # 詳細表示
# app/controllers/tournament_tables_controller.rb
# app/controllers/tournament_tables_controller.rb
  def show
    @tournament_table = TournamentTable.find(params[:id])
    # 各 TournamentPlayer インスタンスのユーザー名を取得
    @players = User.all
    @players_options = @players.map { |user| [user.full_name, user.id] }
  end


  # 新規作成フォーム
  def new
    @tournament_table = TournamentTable.new
    load_form_data
  end

  # 作成処理
  def create
    # binding.pry
    category_id = tournament_table_params[:tournament_category_id]
    division_id = tournament_table_params[:tournament_division_id]
  
    division = TournamentDivision.find_by(id: division_id, tournament_category_id: category_id)
    
    binding.pry
    if division.nil?
      flash[:alert] = "選択されたディビジョンは、このカテゴリーに紐づいていません。"
      load_form_data # データを読み込む
      return render :new
    end
  
    binding.pry
    @tournament_table = TournamentTable.new(tournament_table_params)
    if @tournament_table.save
      redirect_to @tournament_table, notice: "Tournament table created successfully."
    else
      load_form_data # データを読み込む
      render :new
    end
  end
  
  # 編集フォーム
  def edit
    load_form_data
  end

  # 更新処理
  def update
    if @tournament_table.update(tournament_table_params)
      redirect_to @tournament_table, notice: "Tournament table updated successfully."
    else
      render :edit
    end
  end

  # 削除処理
  def destroy
    @tournament_table.destroy
    redirect_to tournament_tables_path, notice: "Tournament table deleted successfully."
  end

# app/controllers/tournament_tables_controller.rb
  def league_select_players
    @tournament_table = TournamentTable.find(params[:id])
    selected_player_ids = params[:selected_players] || []

    # 既存の関連を削除してから新しく追加
    @tournament_table.tournament_table_players.destroy_all
    selected_player_ids.each do |player_id|
      @tournament_table.tournament_table_players.create(tournament_player_id: player_id)
    end

    redirect_to @tournament_table, notice: "Players selected successfully."
  end



  private

  def load_form_data
    @tournaments = Tournament.all
    @categories = TournamentCategory.where(tournament_id: @tournaments.first&.id)
    @divisions = TournamentDivision.where(tournament_category_id: @categories.first&.id)
  end

  def set_tournament_table
    @tournament_table = TournamentTable.find(params[:id])
  end

  def tournament_table_params
    params.require(:tournament_table).permit(:name, :table_type, :tournament_id, :tournament_category_id, :tournament_division_id, :size)
  end
end
