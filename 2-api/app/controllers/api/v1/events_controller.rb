class Api::V1::EventsController < Api::V1::ApiController
  before_action :restrict_access
  before_action :check_authorization, only: [:create, :destroy]

  # GET /api/v1/events
  def index
    events = Event.all

    if events.nil?
      render json: { error: 'No events found'}, status: :not_found
    else
      render json: events, status: :ok
    end
  end

  #GET /api/v1/events/:id
  def show
    #find_by_id() to avoid the exception caused by Event.find() if event was not found
    event = Event.find_by_id(params[:id])

    if tag.nil?
      render json: { error: 'Event was not found. Provided ID does not exist.' }, status: :not_found
    else
      render json: event, status: :ok
    end
  end

  # POST /api/v1/events
  # Create event to current creator
  # Only if authentication passed
  def create
    begin
      event = Event.new(event_params.except(:tags, :position))
      position = Position.new(event_params[:position])
      tags = event_params[:tags]
    rescue
      # Friendly error response
      render json: {
        error: 'Parse error: check spelling, etc. Event obj required, name, description and position is required.',
        event: {
          name: 'string, required',
          description: 'string, required',
          position: { latitude: 'integer, required', longitude: 'integer, required'},
          tags: [ { name: 'optional' }, { name: 'optional' } ]
        },
      }, status: :bad_request and return
    end

    # Create tags if present in request and if "new" or use existing tags.
    if event_params[:tags].present?
      event_params[:tags].each do |tag|
        _tag = Tag.where('lower(name) = ?', tag['name'].downcase).first
        if _tag.nil?
          _tag = Tag.new(tag)
          if !_tag.save
            render json: { errors: _tag.errors.messages }, status: :unprocessable_entity and return
          end
        end
        event.tags << _tag # Add tag to the event
      end
    end

    # Create position if new or use existing position.
    position = Position.where(event_params[:position])[0]
    if position.nil?
      position = Position.new(event_params[:position])
      if !position.save
        render json: { errors: position.errors.messages }, status: :unprocessable_entity and return
      end
    end

    # Add position and creator to the event
    event.position = position
    event.creator = @current_creator

    # Do try and save the event
    if event.save
      render json: event, status: :created
    else
      render json: { errors: event.errors.messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/events/:id
  # Only able to delete the creators own events and not others.
  # Destroy associated resources aswell if relevant
  def destroy
    event = @current_creator.events.find_by_id(params[:id])
    if !event.nil?
      position = event.position
      if position.events.size == 1
        position.destroy
      end

      event.tags.each do |tag|
        if tag.events.size == 1
          tag.destroy
        end
      end

      event.destroy
      head :no_content
    else
      render json: { error: 'Event was not found. Aborted action.' }, status: :not_found
    end
  end

  private

  # Permit event obj with allowed fields
  def event_params
    params.require(:event).permit(:name, :description, tags: [:name], position: [:longitude, :latitude])
  end
end