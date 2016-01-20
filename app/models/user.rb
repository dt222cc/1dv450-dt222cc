class User < ActiveRecord::Base
	has_many :api_keys, dependent: :destroy

    validates :email, uniqueness: true, on: :create # Is not case sensitive... reminder: lowercase the field b4 creation
    validates :email, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/ }

    has_secure_password # Not yet implemented
    validates :password_digest, presence: true, length: { in: 5..72 }
end
