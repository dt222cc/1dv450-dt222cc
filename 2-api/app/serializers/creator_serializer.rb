class CreatorSerializer < ActiveModel::Serializer
  attributes :id, :displayname, :email, :links

  def links
    {
      self: api_v1_creator_path(object.id),
      events: api_v1_creator_events_path(object.id)
    }
  end
end
