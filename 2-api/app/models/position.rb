class Position < ActiveRecord::Base
  # An position can have many event associated to the position
  has_many :events

  ## Validates for presence and numericality for these two fields (float)
  # validates :latitude, :longitude, numericality: true, presence: true

  geocoded_by :address_city
  after_validation :geocode,
    :if => lambda{ |obj| obj.address_city_changed? }

  ## Crashes application
  # reverse_geocoded_by :latitude, :longitude,
  #   :address_city => :location
  # after_validation :reverse_geocode,
  #   :if => lambda{ |obj| obj.address_city_changed? }

  #   reverse_geocoded_by :latitude, :longitude
  #   after_validation :reverse_geocode
end
