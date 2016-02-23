class Api::V1::PositionsController < Api::V1::ApiController
  before_action :restrict_access

  # GET /api/v1/positions
  def index
    positions = Position.all

    if positions.nil?
      render json: { error: 'No positions found'}, status: :not_found
    else
      render json: positions, status: :ok
    end
  end

  #GET /api/v1/positions/:id
  def show
    #find_by_id() to avoid the exception caused by Position.find() if position was not found
    position = Position.find_by_id(params[:id])

    if position.nil?
      render json: { error: 'Position was not found. Provided ID does not exist.' }, status: :not_found
    else
      render json: position, status: :ok
    end
  end

  # POST /api/v1/positions
  # Handle request in wrong format, must be numeric, not duplicate
  def create
    begin
      position = params.require(:position).permit(:latitude, :longitude)
    rescue
      render json: { error: 'Wrong format', position: { latitude: 'integer', longitude: 'integer' } }, status: :bad_request and return
    end

    if !(numeric?(position['latitude']) && numeric?(position['longitude']))
      render json: { error: 'Not numeric!'}, status: :bad_request
    else
      position = Position.new(position)
      exists = Position.find_by_latitude_and_longitude(position.latitude, position.longitude)
      if exists
        render json: { error: 'Position already exists', position: exists}, status: :conflict
      elsif position.save
        render json: position, status: :created
      else
        render json: position.errors.messages, status: :unprocessable_entity # If something odd happens
        # render json: position.errors, status: :unprocessable_entity
        # render json: { errors: 'Unexpected error occured, contact support' }, status: :unprocessable_entity
      end
    end
  end

  # DELETE /api/v1/positions/:id
  def destroy
    position = Position.find_by_id(params[:id])

    # If the position exists > delete/destroy
    if !position.nil?
      position.destroy
      head :no_content # http://stackoverflow.com/questions/8592921/how-to-return-http-204-in-a-rails-controller
    else
      render json: { error: 'Position was not found' }, status: :not_found
    end
  end

  private
  # Source: http://stackoverflow.com/questions/26061584/how-do-i-determine-if-a-string-is-numeric
  def numeric?(string)
    # `!!` converts parsed number to `true`
    !!Kernel.Float(string)
  rescue TypeError, ArgumentError
    false
  end
end
