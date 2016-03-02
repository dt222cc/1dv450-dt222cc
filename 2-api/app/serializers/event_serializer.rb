class EventSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :links

  has_one :creator, serializer: CreatorSerializer
  has_one :position, serializer: PositionSerializer
  has_many :tags, serializer: TagSerializer

  def links
    {
      self: api_v1_event_path(object.id)
    }
  end
end
