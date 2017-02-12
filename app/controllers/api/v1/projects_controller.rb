class Api::V1::ProjectsController < Api::ApplicationController
  def index
    render json: { projects: [] }
  end
end
