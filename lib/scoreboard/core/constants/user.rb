# @author Misha Paliukh <kach95>

module Scoreboard
  module Core
    module Constants
      module User
        module_function

        ROLES = {
          mortal: 0,
          developer: 1,
          codder: 2,
          quality_assurance: 3,
          project_manager: 4,
          business_analyst: 5
        }

        def roles
          {
            ROLES[:mortal] => 'Простой смертный'.freeze,
            ROLES[:developer] => 'Разработчик'.freeze,
            ROLES[:codder] => 'Верстальщик'.freeze,
            ROLES[:quality_assurance] => 'Тестировщик'.freeze,
            ROLES[:project_manager] => 'Менеджер проекта'.freeze,
            ROLES[:business_analyst] => 'Бизнес аналитик'.freeze
          }
        end

      end
    end
  end
end
