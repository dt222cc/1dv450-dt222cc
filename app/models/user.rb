class User < ActiveRecord::Base
	has_many :api_keys, dependent: :destroy
    
    before_save { self.email = email.downcase }
    
    validates :email, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/ }
    validates :email, uniqueness: { case_sensitive: false }, on: :create

    has_secure_password
end
