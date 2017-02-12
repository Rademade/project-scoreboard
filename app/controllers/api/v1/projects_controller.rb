class Api::V1::ProjectsController < Api::ApplicationController
  def index
    render json: Scoreboard::Core::Jira::Project.new(Project.all).to_json
  end
end
