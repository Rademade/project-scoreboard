require 'digest/sha1'

class User < Base
  include RademadeAdmin::UserModule

  validates :email, uniqueness: { case_sensitive: false }
  validates :password, length: { minimum: 8 }, allow_nil: true

  def self.get_by_email(email)
    find_by(email: email)
  end

  def password=(password)
    self[:encrypted_password] = encrypt_password(password) unless password.blank?
  end

  def password
    self[:encrypted_password]
  end

  def to_s
    email
  end

  private

  def encrypt_password(password)
    Digest::SHA1.hexdigest(password)
  end
end
