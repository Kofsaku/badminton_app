class Api::V1::TimetablesController < ApplicationController
  before_action :set_timetable, only: %i[get_timetable_by_id]

  def get_all_timetables
    timetables = Timetable.includes(:tournament, :tournament_venue).all.order(:created_at)
    render json: timetables.as_json(include: {
      tournament: {only: [:id, :name]},
      tournament_venue: {only: [:id, :venue_name]}
    }, only: [:id, :row_count])
  end

  def get_timetable_by_id
    render json: @timetable.as_json(include: {
      tournament: {only: [:id, :name]},
      tournament_venue: {},
      timetable_cells: {
        include: {
          tournament_player: {
            only: [:player_type],
            include: {
              player: {}
            }
          },
          second_tournament_player: {
            only: [:player_type],
            include: {
              player: {}
            }
          },
          match: {
            only: [:id]
          }
        }
      }
    })
  end

  def add_new_timetable
    tournaments = Tournament.all
    render json: tournaments
  end

  private
  
  def set_timetable
    @timetable = Timetable.find(params[:id])
  end
end
