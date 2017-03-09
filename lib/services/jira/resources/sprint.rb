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
          Services::Jira::Serializers::Issues.new(
            full_active_sprint['issues'],
            helper_field.story_points_field
          ).serialize
        end

        def sprint_info
          @sprint_info ||= Services::Jira::Parsers::Issue.new(
            full_active_sprint['issues'].first
          ).sprint_info
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

      end
    end
  end
end
