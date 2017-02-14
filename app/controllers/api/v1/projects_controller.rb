class Api::V1::ProjectsController < Api::ApplicationController
  def index
    render json: Scoreboard::Core::Jira::Projects.new(Project.with_tuned_jira).serialize
  end
end
