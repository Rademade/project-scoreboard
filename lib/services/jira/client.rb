require 'jira-ruby'

module Services
  module Jira
    class Client
      attr_reader :client

      def initialize(jira_account)
        @client ||= JIRA::Client.new({
          username: jira_account.username,
          password: jira_account.password,
          site: jira_account.site,
          context_path: '',
          auth_type: :basic
        })
      end

    end
  end
end
