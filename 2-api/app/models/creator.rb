class Creator < ActiveRecord::Base
  # A creator creates events which are connected to the user
  has_many :events

  # Lowercase email before saving to db
  before_save { self.email = email.downcase }

  # Validates username and email for presence, email format for the email
  # Validates the uniqueness only on creation, also not case sensitive
  validates :username, presence: true
  validates :email, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/ }
  validates :email, uniqueness: { case_sensitive: false }, on: :create

  # Using the bcrypt gem, has some built in validation
  has_secure_password
end
