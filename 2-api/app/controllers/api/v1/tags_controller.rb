class Api::V1::TagsController < ApplicationController
  # GET /api/tags
  def index
    tags = Tag.all

    if tags.nil?
      render json: { error: 'No tags found'}, status: :not_found
    else
      render json: tags, status: :ok
    end
  end

  #GET /api/tags/:id
  def show
    #find_by_id() to avoid the exception caused by Tag.find() if tag was not found
    tag = Tag.find_by_id(params[:id])

    if tag.nil?
      render json: { error: 'Tag was not found. Provided ID does not exist.' }, status: :not_found
    else
      render json: tag, status: :ok
    end
  end
end
