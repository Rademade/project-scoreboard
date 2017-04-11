module Services
  module Jira
    module Resources
      class Project
        attr_reader :project

        ROLES_SORTING_ORDER = ['PM', 'BA', 'Engineers', 'QA']

        def initialize(project)
          @project = project
        end

        def serialize
          {
            id: project.id,
            name: project.name,
            users: sort_by_role(serialized_users),
            sprint: sprint
          }
        end

        private

        def sprint
          Services::Jira::Resources::Sprint.new(project).current_sprint
        end

        def sort_by_role(users)
          groups = users.group_by do |user|
            user[:role]
          end

          ROLES_SORTING_ORDER.map do |role|
            groups[role]
          end.flatten
        end

        def users
          project.users
        end

        def serialized_users
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
