class Api::V1::EventsController < Api::V1::ApiController
  before_action :restrict_access
  before_action :check_authorization, only: [:create, :destroy, :update]
  before_action :offset_and_limit_params, only: [:index]

  # GET /api/v1/events
  def index
    if (tag = Tag.find_by_id(params[:tag_id])).nil?
      events = Event.all
    else
      events = tag.events
    end

    if events.nil?
      render json: { error: 'No events found'}, status: :not_found
    else
      # Response with offset, limit, total amount of events, and the events with the query
      render json: { offset: @offset, limit: @limit, amount: events.count, events: events.limit(@limit).offset(@offset).order("created_at DESC") } , status: :ok
    end
  end

  #GET /api/v1/events/:id
  def show
    if (event = Event.find_by_id(params[:id])).nil?
      render json: { error: 'Event was not found. Provided ID does not exist.' }, status: :not_found
    else
      render json: event, status: :ok
    end
  end

  # POST /api/v1/events
  # Creates an event to current creator, only if authentication passed
  def create
    # Initialize and check if "event" can be found in the request,
    # also acts as a param checker, should contain the event object
    begin
      event = Event.new(event_params.except(:tags, :position))
      position = Position.new(event_params[:position])
    rescue
      render json: event_param_error_response, status: :unprocessable_entity and return
    end

    # If present in the request. Create new or use existing tags.
    if event_params[:tags].present?
      event_params[:tags].each do |tag|
        if (_tag = Tag.where('lower(name) = ?', tag['name'].downcase).first).nil?
          if !(_tag = Tag.new(tag)).save
            render json: { errors: _tag.errors.messages }, status: :unprocessable_entity and return
          end
        end
        event.tags << _tag # Add tag to the event
      end
    end

    # Create new position or use existing position.
    if (position = Position.where(event_params[:position])[0]).nil?
      if !(position = Position.new(event_params[:position])).save
        render json: { errors: position.errors.messages }, status: :unprocessable_entity and return
      end
    end

    event.position = position
    event.creator = @current_creator

    # Do try and save the event
    if event.save
      render json: { action: 'create', event: event, position: event.position, tags: event.tags }, status: :created
    else
      render json: { errors: event.errors.messages }, status: :unprocessable_entity
    end
  end

  # DELETE /api/v1/events/:id
  # Only able to delete the creators own events and not others.
  # Destroy position and tag only if the event was the "only" event associated with the resource.
  def destroy
    if (event = @current_creator.events.find_by_id(params[:id])).nil?
      render json: { error: 'Event was not found. Aborted action.' }, status: :not_found
    else
      if event.position.events.size == 1
        event.position.destroy
      end
      event.tags.each do |tag|
        if tag.events.size == 1
          tag.destroy
        end
      end
      event.destroy
      head :no_content # Return status no_content on successful delete/destroy
    end
  end

  # PUT /api/v1/events/:id
  def update
    # Request checker, error response if request doesn't contains field: event
    begin
      eventParams = event_params
    rescue
      render json: event_param_error_response, status: :unprocessable_entity and return
    end

    # Go on if above check passed
    if !event = Event.find_by_id(params[:id])
      render json: { errors: 'Event was not found. Aborted action. Correct Id?' }, status: :not_found and return
    end

    # Process position, create or use existing resource
    if (position = Position.where(event_params[:position])[0]).nil?
      if !(position = Position.new(event_params[:position])).save
        render json: { errors: position.errors.messages }, status: :unprocessable_entity and return
      end
    end
    # Process tags, create or use existing resources
    tags = []
    if event_params[:tags].present?
      event_params[:tags].each do |tag|
        if (_tag = Tag.where('lower(name) = ?', tag['name'].downcase).first).nil?
          if !(_tag = Tag.new(tag)).save
            render json: { errors: _tag.errors.messages }, status: :unprocessable_entity and return
          end
        end
        tags.push(_tag)
      end
    end

    # Update event, position and tags with invalid field response (missing fields, not a number and etc)
    # Tried to do the hash update, couldn't get it to work...
    if !event.update(name: event_params[:name], description: event_params[:description])
      render json: { errors: event.errors.messages }, status: :unprocessable_entity
    elsif !event.update(position: position)
      render json: { errors: event.position.errors.messages }, status: :unprocessable_entity
    elsif !event.update(tags: tags)
      render json: { errors: event.errors.messages }, status: :unprocessable_entity
    else
      render json: { action: 'update', event: event, position: event.position, tags: event.tags }, status: :created
    end
  end

  private
  def event_params
    params.require(:event).permit(:name, :description, tags: [:name], position: [:longitude, :latitude])
  end

  def event_param_error_response
    return {
      error: 'Parse error: check spelling, etc. Event obj required. Header: Content-Type: application/json',
      event: {
        name: 'string, required',
        description: 'string, required',
        position: { latitude: 'integer, required', longitude: 'integer, required'},
        tags: [ { name: 'optional' }, { name: 'optional' } ]
      },
    }
  end
end