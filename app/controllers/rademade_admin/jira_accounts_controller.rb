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

  def autocomplete_items
    if params[:q].present? && params[:q].length > 0
      JiraAccount.where("site LIKE ?", "%#{params[:q]}%").limit(25).all
    else
      JiraAccount.limit(25)
    end
  end
end
