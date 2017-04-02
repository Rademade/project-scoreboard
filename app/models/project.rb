class Project < Base
  has_and_belongs_to_many :users
  belongs_to :jira_account


  scope :with_tuned_jira, -> {
    with_jira_account.with_jira_rapid_view_id.with_jira_story_points_field
  }

  scope :with_jira_account, -> {
    where.not(jira_account_id: nil)
  }

  scope :with_jira_rapid_view_id, -> {
    where.not(jira_rapid_view_id: nil)
  }

  scope :with_jira_story_points_field, -> {
    where.not(jira_story_points_field: nil)
  }

  validates :name, uniqueness: true

  def to_s
    name
  end
end
