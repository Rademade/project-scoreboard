class Role < Base
  has_many :users, -> { order(position: :asc) }
  validates :name, uniqueness: true

  def to_s
    name
  end
end
