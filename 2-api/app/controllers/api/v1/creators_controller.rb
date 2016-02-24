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
    #find_by_id() to avoid the exception caused by Creator.find() if tag was not found
    creator = Creator.find_by_id(params[:id])

    if creator.nil?
      render json: { error: 'Creator was not found. Provided ID does not exist.' }, status: :not_found
    else
      render json: creator, status: :ok
    end
  end

  # POST /api/v1/creators
  # Request and save errors
  def create
    begin
      creator = Creator.new(params.require(:creator).permit(:displayname, :email, :password, :password_confirmation))

      if creator.save
        render json: creator, status: :created
      else
        render json: creator.errors.messages, status: :unprocessable_entity
      end
    rescue
      render json: {
        error: 'Parse error: check spelling, etc.',
        creator: { displayname: 'User 1', email: 'user@one.se', password: 'userone', password_confirmation: 'userone' }
      }, status: :bad_request and return
    end
  end
end
