class RademadeAdmin::JiraAccountsController < RademadeAdmin::ModelController
  options do
    name 'Jira аккаунты'
    list :site

    form do
      site
      username
      password
    end

    labels do
      site 'Сайт'
      username 'Логин'
      password 'Пароль'
    end
  end
end
