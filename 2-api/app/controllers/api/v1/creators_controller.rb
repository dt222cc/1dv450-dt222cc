class Api::V1::CreatorsController < Api::V1::ApiController
  # GET /api/v1/creators
  def index
    if params[:email]
      creator = Creator.find_by_email(params[:email])

      if creator.nil?
        render json: { error: 'No creator with that email found'}, status: :not_found
      else
        render json: creator, status: :ok
      end
    else
      creators = Creator.all

      if creators.nil?
        render json: { error: 'No creators found'}, status: :not_found
      else
        creators = creators.limit(@limit).offset(@offset).order("created_at DESC")
        creators = serialize_creators(creators)
        render json: creators, status: :ok
      end
    end
  end

  #GET /api/v1/creators/:id
  def show
    creator = Creator.find_by_id(params[:id])

    if creator.nil?
      render json: { error: 'Creator was not found. Provided ID does not exist.' }, status: :not_found
    else
      render json: creator, status: :ok
    end
  end

  def creator_by_email
    creator = Creator.find_by_email(params[:email])

  end

  private
  # Custom serialize to work with normal json (with offset, limit and amount)
  def serialize_creators(creators)
    serialized_creators = []

    creators.each do |creator|
      serialized_creator = {
        creator: {
          id: creator.id,
          displayname: creator.displayname,
          email: creator.email,
          links: {
            self: api_v1_creator_path(creator.id),
            events: api_v1_creator_events_path(creator.id)
          }
        }
      }

      serialized_creators.push(serialized_creator)
    end

    json = {}
    json['offset'] = @offset unless @offset === 0
    json['limit'] = @limit unless @limit === 20
    json['amount'] = creators.count
    json['creators'] = serialized_creators

    return json
  end
end
