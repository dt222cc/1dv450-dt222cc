class User < ActiveRecord::Base
  # A user has many apikeys/applications and theses gets destroyed with the user on a user deletion
  has_many :apps, dependent: :destroy

  # Lowercase email before saving to db
  before_save { self.email = email.downcase }

  # Validates email for presence and email format
  validates :email, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/ }
  # Validates the uniqueness only on creation, also not case sensitive
  validates :email, uniqueness: { case_sensitive: false }, on: :create

  # Using the bcrypt gem, has some built in validation
  has_secure_password
end
