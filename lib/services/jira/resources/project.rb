module Services
  module Jira
    module Resources
      class Project
        attr_reader :project

        def initialize(params)
          @project = ::Project.find(params[:id])
        end

        def show
          if serialized_sprint
            if sprints.exists?
              update(sprints.first)
            else
              create(serialized_sprint.slice(*::Sprint.column_names.map(&:to_sym)))
            end
          end

          serialized_project
        end

      private

        def sprints
          project.sprints.where(name: serialized_sprint[:name])
        end

        def update(sprint)
          if Date.today < sprint.started_at
            sprint.update(serialized_sprint.slice(:planned_velocity, :started_at, :ended_at))
          end

          if sprint.started_at <= Date.today && Date.today <= sprint.ended_at
            if serialized_sprint[:planned_velocity] != sprint.planned_velocity
              sprint.update(deviation_velocity: serialized_sprint[:planned_velocity] - sprint.planned_velocity)
            end
          end
        end

        def create(params)
          project.sprints << ::Sprint.create(params)
          project.save
        end

        def serialized_sprint
          @serialized_sprint ||= Services::Jira::Resources::Sprint.new(project).current_sprint
        end

        def serialized_project
          params = {
            id: project.id,
            name: project.name,
            users: serialized_users,
          }

          if serialized_sprint
            params.merge({
              sprint: serialized_sprint.merge({
                deviation_velocity: sprints.first.deviation_velocity
              })
            })
          else
            params.merge({
              sprint: {error: 'No Active Sprint'}
            })
          end
        end

        def serialized_users
          project.users.sorted_by_role.map do |user|
            {
              full_name: user.full_name,
              role: user.role.name
            }
          end
        end

      end
    end
  end
end
