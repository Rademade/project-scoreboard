module Services
  module Jira
    module Resources
      class Sprint
        attr_reader :client, :helper_field

        def initialize(client, helper_field)
          @client = client
          @helper_field = helper_field
        end

        def find_current_sprint
          {
            number: sprint['name'][/\d+/],
            issues: serialize_issues(current_sprint['issues']),
            timestamps: {
              started_at: Time.now.beginning_of_week,
              ended_at: Time.now.end_of_week
            }
          }
        end

        private

        def sprints
          @sprints ||= client.Sprint.all(helper_field.rapid_view_id)['sprints']
        end

        def sprint
          @sprint ||= sprints.bsearch do |sprint|
            sprint['state'] == 'ACTIVE'
          end
        end

        def current_sprint
          client.Sprint.find(sprint['id'])
        end

        def serialize_issues(issues)
          Parallel.map(issues, in_threads: 2) do |issue|
            serialize_issue issue['fields']
          end.compact
        end

        def serialize_issue(issue)
          if story_points = issue[helper_field.story_points_field]
            {
              issue: issue,
              updated: issue['updated'],
              status: issue.dig('resolution', 'name'),
              summary: issue['summary'],
              story_points: story_points
            }
          end
        end

      end
    end
  end
end
