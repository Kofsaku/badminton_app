class Api::V1::TimetablesController < ApplicationController
  before_action :set_timetable, only: %i[get_timetable_by_id]

  def get_all_timetables
    logger.info "this is user id: --------------------------------------#{session[:current_user_id]}"

    tournament_venues = TournamentVenue.joins(:tournament).where(tournaments: {user_id: session[:current_user_id]})
    render json: tournament_venues.as_json(include: {
      tournament: {only: [:id, :name]},
    })
  end

  def get_timetable_by_id
    render json: @tournament_venue.as_json(include: {
      tournament: {only: [:id, :name]},
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
    @tournament_venue = TournamentVenue.find(params[:id])
  end
end
