class UsersController < ApplicationController
  before_action :set_user, only: %i[ show edit update destroy ]
  before_action :authenticate_user, except: %i[create]
  # GET /users or /users.json
  def index
    @users = User.all
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
      render json: { api_key: user.api_key, message: 'User created successfully' }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show_api_key
    render json: { api_key: @current_user.api_key }
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
      params.require(:user).permit(
        :full_name,
        :email,
        :password,
        :password_confirmation,
        profile_attributes: [:role, :real_name, :pet_name, :telephone_number, :prefecture, :city, :gender, :date_of_birth, :experience, :racket]
      )
    end
end
