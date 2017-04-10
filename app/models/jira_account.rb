class JiraAccount < Base
  has_many :projects

  def to_s
    site
  end
end
