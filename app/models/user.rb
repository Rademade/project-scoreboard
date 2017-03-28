require 'digest/sha1'

class User < Base
  include RademadeAdmin::UserModule

  has_and_belongs_to_many :projects
  belongs_to :role

  validates :email, uniqueness: true
  validates :password, length: { minimum: 5 }, allow_nil: true

  def full_name
    "#{first_name} #{last_name}".strip
  end

  def self.get_by_email(email)
    find_by(email: email)
  end

  def password=(password)
    self[:encrypted_password] = encrypt_password(password) unless password.blank?
  end

  def password
    self[:encrypted_password]
  end

  def valid_password?(password)
    self[:encrypted_password] == encrypt_password(password)
  end

  def to_s
    email
  end

  private

  def encrypt_password(password)
    Digest::SHA1.hexdigest(password)
  end
end
