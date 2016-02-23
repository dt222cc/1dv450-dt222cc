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
    # find_by_id() to avoid the exception caused by Tag.find() if tag was not found
    tag = Tag.find_by_id(params[:id])

    if tag.nil?
      render json: { error: 'Tag was not found. Provided ID does not exist.' }, status: :not_found
    else
      render json: tag, status: :ok
    end
  end

  # POST /api/v1/tags
  def create
    # Check for params
    if (params.has_key?(:name))
      tag = Tag.new(params.permit(:name))

      # Save if tag does not exists
      if Tag.find_by_name(tag.name).nil?
        if tag.save
          render json: tag, status: :created
        else
          render json: tag.errors.messages, status: :bad_request # If something odd happens
        end
      else
        render json: { error: 'This tag already exists' }, status: :conflict
      end
    else
      render json: { error: 'Param for tag name is missing: ?name=tagName' }, status: :bad_request
    end
  end

  # DELETE /api/v1/tags/:id
  def destroy
    tag = Tag.find_by_id(params[:id])

    # If tag does exist > delete/destroy
    if !tag.nil?
      tag.destroy
      head :no_content # http://stackoverflow.com/questions/8592921/how-to-return-http-204-in-a-rails-controller
    else
      render json: { error: 'Tag was not found' }, status: :not_found
    end
  end
end
