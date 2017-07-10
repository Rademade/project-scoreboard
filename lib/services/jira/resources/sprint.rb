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
              name: active_sprint['name'],
              issues: issues,
              planned_velocity: planned_velocity,
              real_velocity: real_velocity,
              progress: (real_velocity * 100 / planned_velocity).round(1),
              started_at: to_date(sprint_info['startDate']),
              ended_at: to_date(sprint_info['endDate'])
            }
          end
        end

      private

        def issues
          @issues ||= Services::Jira::Serializers::Issues.new(
            full_active_sprint['issues'],
            project.jira_story_points_field
          ).serialize.select do |issue|
            issue[:score] > 0
          end
        end

        def planned_velocity
          @planned_velocity ||= issues.inject(0) do |sum, issue|
            sum + issue[:score]
          end || 1
        end

        def real_velocity
          @real_velocity ||= issues.select do |issue|
            issue[:resolved]
          end.inject(0) do |sum, issue|
            sum + issue[:score]
          end
        end

        def sprint_info
          @sprint_info ||= Services::Jira::Parsers::Issue.new(
            full_active_sprint['issues'].first
          ).sprint_info
        end

        def sprints
          @sprints ||= client.Sprint.all(project.jira_board_id)['sprints']
        end

        def active_sprint
          sprints.select do |sprint|
            sprint['state'] == 'ACTIVE'
          end.last
        end

        def full_active_sprint
          @full_active_sprint ||= client.Sprint.find(active_sprint['id'])
        end

        def to_date(date)
          date ? Date.parse(date) : nil
        end

      end
    end
  end
end
