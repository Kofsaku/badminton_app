class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token

  def set_current_user
    session[:current_user_id] = @current_user.id
  end

  def current_user
    current_user ||= User.find(session[:current_user_id])
  end
end
