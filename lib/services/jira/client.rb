require 'jira-ruby'

module Services
  module Jira
    class Client
      attr_reader :client

      def initialize(project)
        @client ||= JIRA::Client.new({
          username: project.jira_account.username,
          password: project.jira_account.password,
          site: project.jira_site,
          context_path: '',
          auth_type: :basic
        })
      end

    end
  end
end
