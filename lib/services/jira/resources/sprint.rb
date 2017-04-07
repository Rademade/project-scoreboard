module Services
  module Jira
    module Resources
      class Sprint
        attr_reader :project, :client

        def initialize(project)
          @project = project
          @client = Services::Jira::Client.new(project.jira_account).client
        end

        def current_sprint
          if active_sprint
            {
              number: number,
              issues: serialized_issues,
              started_at: sprint_info['startDate'],
              ended_at: sprint_info['endDate']
            }
          end
        end

        private

        def number
          active_sprint['name'][/\d+/]
        end

        def issues
          @issues ||= full_active_sprint['issues']
        end

        def serialized_issues
          Services::Jira::Serializers::Issues.new(issues, project.jira_story_points_field).serialize
        end

        def sprint_info
          @sprint_info ||= Services::Jira::Parsers::Issue.new(issues.first).sprint_info
        end

        def sprints
          @sprints ||= client.Sprint.all(project.jira_rapid_view_id)['sprints']
        end

        def active_sprint
          @active_sprint ||= sprints.select do |sprint|
            sprint['state'] == 'ACTIVE'
          end.last
        end

        def full_active_sprint
          @full_active_sprint ||= client.Sprint.find(active_sprint['id'])
        end

      end
    end
  end
end
