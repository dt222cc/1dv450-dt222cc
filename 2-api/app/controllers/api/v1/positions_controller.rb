class Api::V1::PositionsController < Api::V1::ApiController
  # GET /api/v1/positions
  def index
    positions = Position.all

    if positions.nil?
      render json: { error: 'No positions found'}, status: :not_found
    else
      positions = positions.limit(@limit).offset(@offset).order("created_at DESC")
      positions = serialize_positions(positions)
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

  private
  # Custom serialize to work with normal json (with offset, limit and amount)
  def serialize_positions(positions)
    serialized_positions = []

    positions.each do |position|
      serialized_position = {
        position: {
          address_city: position.address_city,
          latitude: position.latitude,
          longitude: position.longitude,
          links: {
            self: api_v1_position_path(position.id),
            events: api_v1_position_events_path(position.id)
          }
        }
      }

      serialized_positions.push(serialized_position)
    end

    json = {}
    json['offset'] = @offset unless @offset === 0
    json['limit'] = @limit unless @limit === 20
    json['amount'] = positions.count
    json['positions'] = serialized_positions

    return json
  end
end
