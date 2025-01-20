class Api::V1::ProfilesController < ApplicationController
  before_action :set_user, only: [:index, :show, :update, :destroy]

  def index
    render json: {
      user: show_full_data(@user)
    }
  end

  def update
    if params[:user][:password].present?
      @user.password = params[:user][:password]
    end
    if @user.update(profile_params)
      render json: { message: 'Tournament updated successfully.' }, status: :ok
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_user
    api_key = request.headers['Authorization']
    @user = User.find_by(api_key: api_key)
  end

  def show_full_data(tournament)
    tournament.attributes.merge(
      profile_attributes: @user.profile
    )
  end

  def profile_params
    params.require(:user).permit(
      :id,
      :email,
      :full_name,
      :password,
      profile_attributes: [
        :id,
        :nickname,
        :furigane_name,
        :gender,
        :date_of_birth,
        :telephone_number,
        :address,
        :job,
      ]
    )
  end

end
