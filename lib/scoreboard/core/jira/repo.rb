require 'jira-ruby'

module Scoreboard
  module Core
    module Jira
      class Repo
        attr_reader :client

        def initialize(params = {})
          @client = JIRA::Client.new({
            username: params[:username],
            password: params[:password],
            site: params[:site],
            context_path: '',
            auth_type: :basic
          })
        end

        def projects
          client.Project.all
        end

      end
    end
  end
end
