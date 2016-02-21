class Position < ActiveRecord::Base
  # An position can have many event associated to the position
  has_many :events

  # Validates for presence and numericality for these two fields (float)
  validates :latitude, :longitude, numericality: true, presence: true
end
