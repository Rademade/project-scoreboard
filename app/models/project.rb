class Project < Base
  has_and_belongs_to_many :users
  belongs_to :jira_account
  belongs_to :jira_helper_field

  validates :name, uniqueness: true

  scope :with_tuned_jira, -> {
    with_jira_account.with_jira_helper_field
  }

  scope :with_jira_account, -> {
    where.not(jira_account_id: nil)
  }

  scope :with_jira_helper_field, -> {
    where.not(jira_helper_field_id: nil)
  }

  def to_s
    name
  end
end
