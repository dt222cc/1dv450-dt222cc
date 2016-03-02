class Api::V1::TagsController < Api::V1::ApiController
  # GET /api/v1/tags
  def index
    tags = Tag.all

    if tags.nil?
      render json: { error: 'No tags found'}, status: :not_found
    else
      tags = tags.limit(@limit).offset(@offset).order("created_at DESC")
      tags = serialize_tags(tags)
      render json: tags, status: :ok
    end
  end

  # GET /api/v1/tags/:id
  def show
    tag = Tag.find_by_id(params[:id])

    if tag.nil?
      render json: { error: 'Tag was not found. Provided ID does not exist.' }, status: :not_found
    else
      render json: tag, status: :ok
    end
  end

  private
  # Custom serialize to work with normal json (with offset, limit and amount)
  def serialize_tags(tags)
    serialized_tags = []

    tags.each do |tag|
      serialized_tag = {
        id: tag.id,
        name: tag.name,
        links: { self: api_v1_tag_path(tag.id), events: api_v1_tag_events_path(tag.id) }
      }

      serialized_tags.push(serialized_tag)
    end

    json = {}
    json['offset'] = @offset unless @offset === 0
    json['limit'] = @limit unless @limit === 20
    json['amount'] = tags.count
    json['tags'] = serialized_tags

    return json
  end
end
