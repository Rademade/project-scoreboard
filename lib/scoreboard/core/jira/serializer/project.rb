require 'jira-ruby'

module Scoreboard
  module Core
    module Jira
      module Serializer
        class Project
          attr_reader :project

          def initialize(project)
            @project = project
          end

          def client
            @client ||= JIRA::Client.new({
              username: project.jira_account.username,
              password: project.jira_account.password,
              site: project.jira_account.site,
              context_path: '',
              auth_type: :basic
            })
          end

          def serialize
            {
              name: project.name,
              users: project.users,
              sprint: sprint
            }
          end

          private

          def sprints
            @sprints ||= client.Sprint.all(project.jira_helper_field.rapid_view_id)['sprints']
          end

          def sprint
            client.Sprint.find(active_sprint['id'])
          end

          def active_sprint
            sprints.find do |sprint|
              sprint['state'] == 'ACTIVE'
            end
          end

        end
      end
    end
  end
end
