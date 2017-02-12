module Scoreboard
  module Core
    module Jira
      class Sprint
        def initialize(params = {})
          @repo = Scoreboard::Core::Jira::Repo.new({
            username: 'mp@rademade.com',
            password: 'rademade',
            site: 'https://rademade-erp.atlassian.net'
          })
        end

        def all
          # TODO
          # projects = @repo.projects
          # get all projects and then find out how to parse key for:

          # client.Sprint.all(key)
          # https://github.com/sumoheavy/jira-ruby/blob/master/lib/jira/resource/sprint.rb
        end

        def current
          # TODO
        end
      end
    end
  end
end
