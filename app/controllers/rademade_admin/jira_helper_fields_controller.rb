class RademadeAdmin::JiraHelperFieldsController < RademadeAdmin::ModelController
  options do
    name 'Jira поля хелперы'
    list :rapid_view_id

    form do
      rapid_view_id
      story_points_field
    end

    labels do
      rapid_view_id 'ID быстрого просмотра'
      story_points_field 'Story points field'
    end
  end
end
