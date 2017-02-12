module Scoreboard
  module Core
    module Jira
      module Serializer
        class Project
          attr_reader :project

          def initialize(project)
            @project = project

            # TODO
            #
            # from project.jira_account
            #
            # @client = Scoreboard::Core::Jira::Client.new({
            #   username: 'mp@rademade.com',
            #   password: 'rademade',
            #   site: 'https://rademade-erp.atlassian.net'
            # }).sprint
          end

          def serialize
            # TODO
          end

        end
      end
    end
  end
end
