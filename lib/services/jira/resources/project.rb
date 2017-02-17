module Services
  module Jira
    module Resources
      class Project
        attr_reader :project, :client

        def initialize(project)
          @project = project
          @client = Services::Jira::Client.new(project.jira_account).client
        end

        def serialize
          {
            name: project.name,
            users: project.users,
            current_sprint: current_sprint
          }
        end

        private

        def current_sprint
          @current_sprint ||= Services::Jira::Resources::Sprint.new(
            client,
            project.jira_helper_field
          ).find_current_sprint
        end

      end
    end
  end
end
