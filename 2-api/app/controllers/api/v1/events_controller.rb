class Api::V1::EventsController < Api::V1::ApiController
  before_action :check_authorization, only: [:create, :destroy, :update]

  # GET /api/v1/events
  # All events, creator's events, position's events, tag's events
  # Filter events by nearby coordinates if params lat and lng is present
  # Limit and offset can be used with all searches
  def index
    events = []

    # Get events by creator/position/tag or all
    if params[:creator_id]
      events = Event.where(creator_id: params[:creator_id])
    elsif params[:position_id]
      events = Event.where(position_id: params[:position_id])
    elsif params[:tag_id]
      tag = Tag.find_by_id(params[:tag_id])
      events = tag.events unless tag.nil?
    elsif params[:query]
      events = Event.joins(:tags)
        .where("lower(events.name) like :query OR lower(description) like :query OR lower(tags.name) like :query", query: "%#{params[:query].downcase}%")
    else
      events = Event.all
    end

    # Add offset, limit & order to current events if events are present from the search
    events = events.limit(@limit).offset(@offset).order("created_at DESC") unless !events.present?

    # Filter events by coordination if params lat and lng is present (keep nearby events)
    if params[:lat] && params[:lng] && events.present?
      lat = params[:lat].to_f
      lng = params[:lng].to_f

      # Retrieve positions of specified coordinates
      if (nearby_positions = Position.where(latitude: lat - 2..lat + 2, longitude: lng - 2..lng + 2)).nil?
        render json: { error: 'No events found within the coordinates'}, status: :not_found and return
      else
        filteredEvents = []
        events.each do |event|
          if nearby_positions.exists?(event.position)
            filteredEvents.push(event)
          end
        end

        events = filteredEvents
      end
    end

    # Check if events exists with all the filters.
    if events.present?
      # Serialize events to include offset(if not default), limit(if not default), amount
      render json: serialize_events(events), status: :ok
    else
      render json: { error: 'No events found'}, status: :not_found
    end
  end

  #GET /api/v1/events/:id
  def show
    if event = Event.find_by_id(params[:id])
      render json: event, status: :ok
    else
      render json: { error: 'Event was not found. Provided ID does not exist.' }, status: :not_found
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
    if Event.find_by_id(params[:id]).nil?
      render json: { error: 'Event was not found. Aborted action. Correct Id?' }, status: :not_found
    else
      event = @current_creator.events.find_by_id(params[:id])
      if event.nil?
        render json: { error: 'Forbidden, you are not the owner of this resource.' }, status: :forbidden
      else
        event.destroy
        if event.position.events.size == 1
          event.position.destroy
        end
        event.tags.each do |tag|
          if tag.events.size == 1
            tag.destroy
          end
        end
        head :no_content # Return status no_content on successful delete/destroy
      end
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

    # Go on if event exists and if belongs to current creator/user
    if Event.find_by_id(params[:id])
      event = @current_creator.events.find_by_id(params[:id])
      if event.nil?
        render json: { error: 'Forbidden, you are not the owner of this resource.' }, status: :forbidden and return
      end
    else
      render json: { error: 'Event was not found. Aborted action. Correct Id?' }, status: :not_found and return
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
  # Strong params
  def event_params
    params.require(:event).permit(:name, :description, tags: [:name], position: [:longitude, :latitude])
  end

  # Relative user friendly error response if the request was in the wrong format
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

  # Custom serialize to work with normal json (with offset, limit and amount)
  # I exclude the ID beacuse it's present in the links
  def serialize_events(events)
    serialized_events = []

    events.each do |event|
      serialized_tags = []
      event.tags.each do |tag|
        serialized_tag = {
          name: tag.name,
          links: { self: api_v1_tag_path(tag.id), events: api_v1_tag_events_path(tag.id) }
        }
        serialized_tags.push(serialized_tag)
      end

      serialized_event = {
        name: event.name,
        description: event.description,
        links: { self: api_v1_event_path(event.id) },
        creator: {
          displayname: event.creator.displayname,
          email: event.creator.email,
          links: { self: api_v1_creator_path(event.creator.id), events: api_v1_creator_events_path(event.creator.id) }
        },
        position: {
          latitude: event.position.latitude,
          longitude: event.position.longitude,
          links: { self: api_v1_position_path(event.position.id), events: api_v1_position_events_path(event.position.id) }
        },
        tags: serialized_tags
      }

      serialized_events.push(serialized_event)
    end

    json = {}
    json['offset'] = @offset unless @offset === 0
    json['limit'] = @limit unless @limit === 20
    json['amount'] = events.count
    json['events'] = serialized_events

    return json
  end
end