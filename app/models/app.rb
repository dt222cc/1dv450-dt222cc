class App < ActiveRecord::Base
    belongs_to :user

    # Must have a owner, app name and an api key
    validates :user, :name, :key, presence: true
end
