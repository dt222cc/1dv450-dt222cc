class TagSerializer < ActiveModel::Serializer
  attributes :id, :name, :links

  def links
    {
      self: api_v1_tag_path(object.id),
      events: api_v1_tag_events_path(object.id)
    }
  end
end
