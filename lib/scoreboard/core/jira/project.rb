module Scoreboard
  module Core
    module Jira
      class Project
        attr_reader :projects

        def initialize(projects)
          @projects = projects
        end

        def to_json
          {
            projects: serialized_projects
          }.to_json
        end

        private

        def serialized_projects
          Scoreboard::Core::Jira::Serializer::Projects.new(projects).serialize
        end

      end
    end
  end
end
