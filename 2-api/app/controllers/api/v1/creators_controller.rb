class Api::V1::CreatorsController < ApplicationController
  def index
    render json: Creator.all
  end
end
