class Sprint < Base
  belongs_to :project

  def to_s
    [project.name, name].join(' --> ')
  end
end
