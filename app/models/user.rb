class User < ActiveRecord::Base
	has_many :api_keys, dependent: :destroy

    before_save { self.email = email.downcase }
    validates :email, presence: true, uniqueness: { case_sensitive: false },
        format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/ },
        on: :create

    has_secure_password # Not yet implemented
    validates :password_digest, presence: true, length: { in: 5..72 }
end
