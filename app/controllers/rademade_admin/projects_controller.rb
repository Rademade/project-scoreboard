class RademadeAdmin::ProjectsController < RademadeAdmin::ModelController
  options do
    name 'Проекты'
    list :name

    form do
      name
      users
    end

    labels do
      name 'Название'
      users 'Пользователи'
    end
  end
end
