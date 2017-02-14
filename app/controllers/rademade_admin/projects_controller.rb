class RademadeAdmin::ProjectsController < RademadeAdmin::ModelController
  options do
    name 'Проекты'
    list :name

    form do
      name
      jira_account
      users
    end

    labels do
      name 'Название'
      jira_account 'Jira Аккаунт'
      users 'Команда'
    end
  end
end
