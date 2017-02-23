module Services
  module Jira
    module Resources
      class Sprint
        attr_reader :client, :helper_field

        def initialize(client, helper_field)
          @client = client
          @helper_field = helper_field
        end

        def current_sprint
          if active_sprint
            {
              number: number,
              issues: issues,
              timestamps: timestamps
            }
          end
        end

        private

        def number
          active_sprint['name'][/\d+/]
        end

        def issues
          serialize_issues(full_active_sprint['issues'])
        end

        def sprint_raw_info_string
          issue = full_active_sprint['issues'].first
          customfields = issue['fields'].select do |key, value|
            key.match(/customfield/) && value.is_a?(Array)
          end

          sprint_customfield_value = customfields.select do |key, value|
            value.is_a?(Array)
          end.values[0]

          raw_string = sprint_customfield_value[0]
          raw_string.gsub(/.*\[/, '').gsub(/\]/, '')
        end

        def sprint_raw_info_array_of_tuples
          @sprint_raw_info_array ||= sprint_raw_info_string.split(',').map do |raw_string|
            raw_string.split('=')
          end.select do |array|
            array.size == 2
          end
        end

        def sprint_info
          @sprint_info ||= Hash[sprint_raw_info_array_of_tuples.map { |tuple| [tuple.first, tuple.last] }]
        end

        def timestamps
          {
            started_at: sprint_info['startDate'],
            ended_at: sprint_info['endDate']
          }
        end

        def sprints
          @sprints ||= client.Sprint.all(helper_field.rapid_view_id)['sprints']
        end

        def active_sprint
          @active_sprint ||= sprints.bsearch do |sprint|
            sprint['state'] == 'ACTIVE'
          end
        end

        def full_active_sprint
          @full_active_sprint ||= client.Sprint.find(active_sprint['id'])
        end

        def serialize_issues(issues)
          Parallel.map(issues, in_threads: 2) do |issue|
            serialize_issue issue['fields']
          end.compact
        end

        def serialize_issue(issue)
          if story_points = issue[helper_field.story_points_field]
            {
              updated: issue['updated'],
              resolution_date: issue['resolutiondate'],
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
