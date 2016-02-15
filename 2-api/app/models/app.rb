class App < ActiveRecord::Base
    belongs_to :user
    
    # Generates unique API key before save
    before_save :generate_token

    # Must have a owner, app name and an api key
    validates :user, :name, presence: true
    # Unique Application name
    validates :name, uniqueness: { case_sensitive: false }
    
    # http://stackoverflow.com/questions/6021372/best-way-to-create-unique-token-in-rails
    def generate_token
        # Loop, generate random_token and breaks if the random_token is "unique"
        self.key = loop do
            random_token = SecureRandom.urlsafe_base64(nil, false)
            break random_token unless App.exists?(key: random_token)
        end
    end
end
