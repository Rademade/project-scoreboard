module Services
  module Jira
    module Parsers
      class Issue
        attr_reader :issue

        def initialize(issue)
          @issue = issue
        end

        def sprint_info
          Hash[sprint_raw_info_array_of_tuples.map { |tuple| [tuple.first, tuple.last] }]
        end

        private

        def sprint_raw_info_string
          customfields = issue['fields'].select do |key, value|
            key.match(/customfield/) && value.is_a?(Array)
          end

          sprint_customfield_value = customfields.select do |key, value|
            value.is_a?(Array) && value.any?
          end.values.flatten.last

          raw_string = sprint_customfield_value
          raw_string.gsub(/.*\[/, '').gsub(/\]/, '')
        end

        def sprint_raw_info_array_of_tuples
          @sprint_raw_info_array ||= sprint_raw_info_string.split(',').map do |raw_string|
            raw_string.split('=')
          end.select do |array|
            array.size == 2
          end
        end

      end
    end
  end
end
