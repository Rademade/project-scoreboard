class RademadeAdmin::JiraAccountsController < RademadeAdmin::ModelController
  options do
    name 'Jira аккаунты'
    list :username, :site

    form do
      username
      password
      site
    end

    labels do
      username 'Логин'
      password 'Пароль'
      site 'Jira cайт'
    end
  end
end
