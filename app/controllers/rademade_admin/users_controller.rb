class RademadeAdmin::UsersController < RademadeAdmin::ModelController
  options do
    name 'Люди'
    list :email, :admin

    form do
      first_name
      last_name
      email
      role
      admin
      password
    end

    labels do
      first_name 'Имя'
      last_name 'Фамилия'
      role 'Роль'
      email 'Email'
      admin 'Админ'
      password 'Пароль'
    end
  end
end
