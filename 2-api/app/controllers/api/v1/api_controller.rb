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

    # Check credentials from the header and try to authenticate, true if all goes fine else 400
  def check_authorization
    require 'base64' # Decode Basic Auth, Postman: Basic dXNlc3JAb25lLnNlOnVzZXJvbmU=

    # Split, keep second part then decode and then split again
    credentials = Base64.decode64(request.headers['Authorization'].split[1])
    # => ["email:password"]
    credentials = credentials.split(':')
    # => ["email", "password"]

    # Get the creator by email
    @current_creator = Creator.find_by(email: credentials[0].downcase)

    # If nil and not able to authenticate with the password, return forbidden 403
    unless @current_creator && @current_creator.authenticate(credentials[1])
      render json: { error: 'Not authorized! Wrong credentials!'}, status: :forbidden
    end

    # Else true and keep on with the action..
  end

  def render_param_response
    return {
      error: 'Parse error: check spelling, etc. Event obj required.',
      event: {
        name: 'string, required',
        description: 'string, required',
        position: { latitude: 'integer, required', longitude: 'integer, required'},
        tags: [ { name: 'optional' }, { name: 'optional' } ]
      },
    }
  end
end
