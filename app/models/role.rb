class Role < Base
  has_many :users
  validates :name, uniqueness: true
end
