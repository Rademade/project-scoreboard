class RademadeAdmin::ProjectsController < RademadeAdmin::ModelController
  options do
    name 'Проекты'
    list :name

    form do
      name
      jira_api_key
      users
    end

    labels do
      name 'Название'
      jira_api_key 'Jira API ключ'
      users 'Пользователи'
    end
  end
end
