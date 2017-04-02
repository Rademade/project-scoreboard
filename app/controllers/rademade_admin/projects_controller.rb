class RademadeAdmin::ProjectsController < RademadeAdmin::ModelController
  options do
    name 'Проекты'
    list :name

    form do
      name
      users
      jira_account
      jira_rapid_view_id
      jira_story_points_field
    end

    labels do
      name 'Название'
      users 'Команда'
      jira_account 'Jira Аккаунт'
      jira_rapid_view_id 'Значение ключа rapidView в url строке на борде проекта в Jira'
      jira_story_points_field 'Поле в котором Jira хранит story points по API'
    end
  end
end
