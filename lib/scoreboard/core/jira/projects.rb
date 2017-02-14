module Scoreboard
  module Core
    module Jira
      class Projects
        attr_reader :projects

        def initialize(projects)
          @projects = projects
        end

        def serialize
          Scoreboard::Core::Jira::Serializer::Projects.new(projects).serialize
        end

      end
    end
  end
end
