module Scoreboard
  module Core
    module Jira
      module Serializer
        class Projects
          attr_reader :projects

          def initialize(projects)
            @projects = projects
          end

          def serialize
            projects.map do |project|
              Scoreboard::Core::Jira::Serializer::Project.new(project).serialize
            end
          end

        end
      end
    end
  end
end
