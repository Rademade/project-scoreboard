class JiraAccount < Base
  has_many :projects
  validates :site, uniqueness: true

  def to_s
    site
  end
end
