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
    position = Position.find_by_id(params[:id])

    if position.nil?
      render json: { error: 'Position was not found. Provided ID does not exist.' }, status: :not_found
    else
      render json: position, status: :ok
    end
  end
end
