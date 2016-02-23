class Api::V1::EventsController < ApplicationController
  before_action :restrict_access

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
end