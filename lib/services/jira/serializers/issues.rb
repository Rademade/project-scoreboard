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
          issues.map do |issue|
            serialize_issue(issue['fields'])
          end.compact
        end

      private

        def serialize_issue(issue)
          {
            id: to_id(issue.dig('votes', 'self')),
            score: issue[story_points_field].to_f,
            created: to_date(issue['created']),
            updated: to_date(issue['updated']),
            resolved: to_date(issue['resolutiondate'])
          }
        end

        def to_date(date)
          date ? Date.parse(date) : nil
        end

        def to_id(link)
          link ? link[/issue\/(.*?)\/votes/m, 1] : nil
        end

      end
    end
  end
end
