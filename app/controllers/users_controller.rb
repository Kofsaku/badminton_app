class UsersController < ApplicationController
  before_action :set_user, only: %i[ show edit update destroy destroy_organizer_by_id ]
  before_action :authenticate_user, only: %i[ show_api_key regenerate_api_key ]
  # GET /users or /users.json
  def index
  end

  def players_list
    @users = User.includes(:profile)
             .where(profiles: { role: ["Player", "Both", "player"] })
             .page(params[:page])
             .per(params[:per_page] || 50)

    tournament_player_ids = TournamentPlayer.where(tournament_id: params["tournament_id"]).pluck(:player_id) if params["tournament_id"]

    render json: {
      users: @users.map do |user|
        user.as_json(
          include: {
            profile: {
              only: [:id, :years_of_experience, :date_of_birth, :prefecture, :gender]
            }
          }
        ).merge(part_of_tournament: tournament_player_ids&.include?(user.id))
      end,
      current_page: @users.current_page,
      total_pages: @users.total_pages,
      total_count: @users.total_count
    }
  end

  def organizers_list
    @users = User.includes(:profile)
             .where(profile: { role: ["Tournament Organizer", "Both"] })

    logger.info "this is logger from organizers list #{@users.inspect}"

    render json: @users.as_json(
      include: {
        profile: {
          only: [:id, :role, :date_of_birth, :gender]
        }
      }
    )
  end

  def get_organizer_by_id
    @user = User.find(params[:id])

    logger.info "this is logger from organizers list #{@users.inspect}"

    render json: @user.as_json(
      include: {
        profile: {
          only: [:id, :role, :date_of_birth, :gender]
        }
      }
    )
  end

  def destroy_organizer_by_id
    ApplicationRecord.transaction do
      @user.destroy!
    rescue ActiveRecord::RecordInvalid
      render json: { message: 'Organizer destroys failed' }
    end
  
    render json: { message: 'Organizer is successfully destroy' }
  end

  def update_organizer_by_id
    @user = User.find(params[:id])
    @user.full_name = user_params[:full_name]
    @user.email = user_params[:email]

    if @user.save!
      @profile = @user.profile
      @profile.gender = user_params[:profile_attributes][:gender]
      @profile.role = user_params[:profile_attributes][:role]
      @profile.date_of_birth = user_params[:profile_attributes][:date_of_birth]

      if @profile.save!
        render json: {message: "successfully updated"}
      else
        render json: {message: "incorrect params"}, status: :unprocessable_entity
      end
    else
      render json: {message: "incorrect params"}, status: :unprocessable_entity
    end
  end

  # GET /users/1 or /users/1.json
  def show
  end

  # GET /users/new
  def new
    @user = User.new
  end

  # GET /users/1/edit
  def edit
  end

  def create
    user = User.new(user_params)

    if user.save!
      profile = Profile.new(user: user, role: user_params[:profile_attributes][:role])

      render json: { api_key: user.api_key, full_name: user.full_name, role: profile.role, message: 'User created successfully' }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show_api_key
    set_current_user
    render json: { api_key: @current_user.api_key, full_name: @current_user.full_name, role: @current_user.profile&.role }
  end

  def regenerate_api_key
    @current_user.regenerate_api_key
    render json: { api_key: @current_user.api_key, message: 'API key regenerated successfully' }
  end


  # PATCH/PUT /users/1 or /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to user_url(@user), notice: "User was successfully updated." }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1 or /users/1.json
  def destroy
    @user.destroy

    respond_to do |format|
      format.html { redirect_to users_url, notice: "User was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    def authenticate_user
      user = User.find_by(email: params[:email])
      if user&.authenticate(params[:password])
        @current_user = user
      else
        render json: { error: 'Invalid email or password' }, status: :unauthorized
      end
    end

    def user_params
      params.permit(
        :full_name,
        :email,
        :password,
        :password_confirmation,
        :role,
        profile_attributes: [
          :role, :real_name, :pet_name, :telephone_number, :prefecture,
          :city, :gender, :date_of_birth, :experience, :racket, :address,
          :years_of_experience, :affiliation, :age
        ]
      )
    end

end
