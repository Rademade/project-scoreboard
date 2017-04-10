module Services
  module Jira
    module Resources
      class Project
        attr_reader :project

        def initialize(project)
          @project = project
        end

        def serialize
          {
            id: project.id,
            name: project.name,
            users: serialize_users(project.users),
            sprint: sprint
          }
        end

        private

        def sprint
          Services::Jira::Resources::Sprint.new(project).current_sprint
        end

        def serialize_users(users)
          users.map do |user|
            user.role ? {
              full_name: user.full_name,
              role: user.role.name
            } : nil
          end.compact
        end

      end
    end
  end
end
