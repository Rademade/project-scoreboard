module Services
  module Jira
    module Resources
      class Sprint
        attr_reader :client, :rapid_view_id

        def initialize(client, rapid_view_id)
          @client = client
          @rapid_view_id = rapid_view_id
        end

        def find_current_sprint
          {
            number: sprint['name'][/\d+/],
            issues: serialize_issues(current_sprint['issues'])
          }
        end

        private

        def sprints
          @sprints ||= client.Sprint.all(rapid_view_id)['sprints']
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
          end
        end

        # TODO add /customfields/ to jira helper fields
        def serialize_issue(issue)
          {
            summary: issue['summary'],
            story_points: issue['customfield_10022'].to_i,
            status: issue['customfield_10020']
          }
        end

      end
    end
  end
end
