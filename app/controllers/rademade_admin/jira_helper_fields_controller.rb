class RademadeAdmin::JiraHelperFieldsController < RademadeAdmin::ModelController
  options do
    name 'Jira поля хелперы'
    list :rapid_view_id

    form do
      rapid_view_id
    end

    labels do
      rapid_view_id 'ID быстрого просмотра'
    end
  end
end
