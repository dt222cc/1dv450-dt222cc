class App < ActiveRecord::Base
  # An application belongs to an user, cannot exist without one
  belongs_to :user

  # Generates unique API key before save
  before_save :generate_token

  # Must have a owner, app name and an api key
  validates :user, :name, presence: true
  # Must have an unique application name
  validates :name, uniqueness: { case_sensitive: false }

  # Source: http://stackoverflow.com/questions/6021372/best-way-to-create-unique-token-in-rails01
  # Generate random_token and breaks if the random_token is "unique", else loop
    def generate_token
    self.key = loop do
      random_token = SecureRandom.urlsafe_base64(nil, false)
      break random_token unless App.exists?(key: random_token)
    end
  end
end
