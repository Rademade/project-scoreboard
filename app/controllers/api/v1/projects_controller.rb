class Api::V1::ProjectsController < Api::ApplicationController
  def index
    render json: Project.with_tuned_jira.select(:id, :name)
  end

  def show
    render json: Services::Jira::Resources::Project.new(
      Project.find(params[:id])
    ).serialize
  end
end
