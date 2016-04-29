class Api::V1::ApiController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  # Must include access_token(api-key/api-token) with every request
  before_filter :restrict_access

  before_filter :offset_and_limit_params, only: [:index]

  # before_action :cors_set_access_control_headers
  # after_filter :cors_set_access_control_headers

  # User/developer must provide ApiKey for access
  # Example: /api/events?access_token=BniT_MXQ70EfFFMw3kRHSw
  def restrict_access
    unless App.exists?(key: params[:access_token])
      render json: { error: "API-key invalid. Access denied." }, status: :unauthorized
    end
  end

  # Check credentials from the header and try to authenticate, true if all goes fine else 400
  def check_authorization
    # Decode Basic Auth, future jwt?
    require 'base64'

    credentials = request.headers['Authorization']

    if credentials.nil?
      render json: { error: 'Missing credentials, Authorization: Basic Auth (user@two.se:usertwo)'}, status: :forbidden
    else
      # Split > decode > split
      credentials = Base64.decode64(credentials.split[1]).split(':')

      # Get the creator by email
      @current_creator = Creator.find_by(email: credentials[0].downcase)

      # If nil and not able to authenticate with the password, return forbidden 403
      unless @current_creator && @current_creator.authenticate(credentials[1])
        render json: { error: 'Not authorized! Wrong credentials!'}, status: :forbidden
      end
    end
  end

  # Default parameters is 0 for offset and 20 for limit,
  # basically default values if user didnt specify offset/limit
  def offset_and_limit_params
    # Ternary Logic :D
    @offset = params[:offset].nil? ? 0  : params[:offset].to_i
    @limit  = params[:limit].nil?  ? 20 : params[:limit].to_i
  end

  # # Temp, while developing the client application
  # def cors_set_access_control_headers
  #   headers['Access-Control-Allow-Origin'] = '*'
  #   # headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
  #   headers['Access-Control-Max-Age'] = '1728000'
  # end
end
