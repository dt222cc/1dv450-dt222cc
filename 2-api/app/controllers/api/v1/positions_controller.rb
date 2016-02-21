class Api::V1::PositionsController < ApplicationController
  def index
    render json: Position.all
  end
end
