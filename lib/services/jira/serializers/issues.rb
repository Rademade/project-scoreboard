module Services
  module Jira
    module Serializers
      class Issues
        attr_reader :issues, :story_points_field

        def initialize(issues, story_points_field)
          @issues = issues
          @story_points_field = story_points_field
        end

        def serialize
          Parallel.map(issues, in_threads: 2) do |issue|
            serialize_issue(issue['fields'])
          end.compact
        end

        private

        def serialize_issue(issue)
          {
            resolution_date: issue['resolutiondate'] ? Date.parse(issue['resolutiondate']) : nil,
            status: issue.dig('resolution', 'name'),
            summary: issue['summary'],
            story_points: issue[story_points_field]
          }
        end

      end
    end
  end
end
