# app/controllers/categories_controller.rb
class CategoriesController < ApplicationController
  def divisions
    category = TournamentCategory.find(params[:category_id])
    divisions = category.tournament_divisions

    render json: { divisions: divisions.as_json(only: [:id, :division]) }
  end
end
