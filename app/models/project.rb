class Project < Base
  has_and_belongs_to_many :users
  belongs_to :jira_account

  validates :name, uniqueness: true

  def to_s
    name
  end
end
