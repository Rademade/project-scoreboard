class RademadeAdmin::JiraAccountsController < RademadeAdmin::ModelController
  options do
    name 'Jira аккаунты'
    list :username

    form do
      username
      password
    end

    labels do
      username 'Логин'
      password 'Пароль'
    end
  end
end
