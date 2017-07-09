class RademadeAdmin::SprintsController < RademadeAdmin::ModelController
  options do
    name 'Спринты'
    list :name, :planned_velocity, :deviation_velocity, :started_at, :ended_at

    form do
      name
      planned_velocity
      deviation_velocity
      started_at
      ended_at
    end

    labels do
      name 'Название'
      planned_velocity 'Запланированная скорость'
      deviation_velocity 'Погрешность скорости'
      started_at 'Начало'
      ended_at 'Конец'
    end
  end
end
