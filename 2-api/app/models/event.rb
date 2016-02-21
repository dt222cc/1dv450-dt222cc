class Event < ActiveRecord::Base
  # An event has a creator and connected to a position
  belongs_to :creator
  belongs_to :position
  # The event can have many events
  has_and_belongs_to_many :tags

  # Validates presence for the name and description
  validates :name, :description, presence: true
end
