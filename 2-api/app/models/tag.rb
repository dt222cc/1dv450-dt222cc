class Tag < ActiveRecord::Base
  # A tag is associated with events and thus the has_and_belongs_to_many
  has_and_belongs_to_many :events

  # Validates name for presence and uniqueness (on create)
  validates :name, presence: true
  validates :name, uniqueness: { case_sensitive: false }, on: :create
end
