class RademadeAdmin::RolesController < RademadeAdmin::ModelController
  options do
    name 'Роли'
    list :name

    form do
      name
    end

    labels do
      name 'Название'
    end
  end
end
