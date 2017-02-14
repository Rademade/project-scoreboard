class Role < Base
  has_many :users
  validates :name, uniqueness: true

  def to_s
    name
  end
end
