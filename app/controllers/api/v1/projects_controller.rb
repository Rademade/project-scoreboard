class Api::V1::ProjectsController < Api::ApplicationController
  def index
    render json: projects
  end

  private

  def projects
    Parallel.map(Project.with_tuned_jira, in_threads: 2) do |project|
      Services::Jira::Resources::Project.new(project).serialize
    end
  end
end
