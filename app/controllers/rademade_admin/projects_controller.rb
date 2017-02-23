class RademadeAdmin::ProjectsController < RademadeAdmin::ModelController
  options do
    name 'Проекты'
    list :name

    form do
      name
      users
      jira_account
      jira_helper_field
    end

    labels do
      name 'Название'
      users 'Команда'
      jira_account 'Jira Аккаунт'
      jira_helper_field 'Jira поля хелперы'
    end
  end
end
