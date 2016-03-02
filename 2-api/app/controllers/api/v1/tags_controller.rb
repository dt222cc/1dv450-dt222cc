class Api::V1::TagsController < Api::V1::ApiController
  before_action :restrict_access

  # GET /api/v1/tags
  def index
    tags = Tag.all

    if tags.nil?
      render json: { error: 'No tags found'}, status: :not_found
    else
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
end
