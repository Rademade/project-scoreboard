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
            start_date = Date.parse(sprint_info['startDate']) rescue sprint_info['startDate']
            end_date = Date.parse(sprint_info['endDate']) rescue sprint_info['endDate']

            {
              name: active_sprint['name'],
              issues: serialized_issues,
              started_at: start_date,
              ended_at: end_date,
              raw_issues: issues
            }
          end
        end

        private

        def issues
          @issues ||= full_active_sprint['issues']
        end

        def issues_sprint_info
          issues.map do |issue|
            Services::Jira::Parsers::Issue.new(issue).sprint_info
          end
        end

        def serialized_issues
          Services::Jira::Serializers::Issues.new(issues, project.jira_story_points_field).serialize
        end

        def sprint_info
          @sprint_info ||= Services::Jira::Parsers::Issue.new(issues.first).sprint_info
        end

        def sprints
          @sprints ||= client.Sprint.all(project.jira_board_id)['sprints']
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
