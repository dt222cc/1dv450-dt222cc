class Api::V1::CreatorsController < Api::V1::ApiController
  before_action :restrict_access

  # GET /api/v1/creators
  def index
    creators = Creator.all

    if creators.nil?
      render json: { error: 'No creators found'}, status: :not_found
    else
      render json: creators, status: :ok
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
end
