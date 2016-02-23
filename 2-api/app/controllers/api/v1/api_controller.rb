class Api::V1::ApiController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  # User/developer must provide ApiKey for access
  # Example: /api/events?access_token=BniT_MXQ70EfFFMw3kRHSw
  def restrict_access
    unless App.exists?(key: params[:access_token])
      render json: { error: "API-key invalid. Access denied." }, status: :unauthorized
    end
  end
end
