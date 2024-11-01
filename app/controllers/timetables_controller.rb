class TimetablesController < ApplicationController
  def index
    @timetables = Timetable.all
  end

  def new
    @timetable = Timetable.new
    @tournaments = Tournament.all  #memo this should be ones associated with the current user
  end

  def show
    @timetable = Timetable.find(params[:id])
  end
  
  # 大会に関連する体育館情報と日程リストを取得するアクション
  def venues_for_tournament
    tournament = Tournament.find(params[:tournament_id])
    @tournament_venues = tournament.tournament_venues  # 大会に関連するすべての体育館と日程

    render json: @tournament_venues.map { |venue| { id: venue.id, venue_name: venue.venue_name, venue_date: venue.venue_date } }
  end

  def create
    @timetable = Timetable.new(timetable_params)  
    
    if @timetable.save
      redirect_to @timetable, notice: 'タイムテーブルが作成されました'
    else
      Rails.logger.debug(@timetable.errors.full_messages)  # エラー内容をログに出力
      @tournaments = Tournament.all  # エラー時に @tournaments を再設定
      render :new, status: :unprocessable_entity
    end
  end

  def get_memos
    memos || []
  end

  # 時間情報を追加または更新
  def update_memo(row_index, time_value)
    updated_memos = get_memos
    updated_memos[row_index] = time_value
    update(memos: updated_memos)
  end
  

  private

  def timetable_params
    puts params
    params.require(:timetable).permit(:tournament_venue_id, :row_count, :memos )
  end
  
end
