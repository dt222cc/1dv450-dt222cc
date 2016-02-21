class CreateEventsTags < ActiveRecord::Migration
  def change
    # No primary keys
    create_table :events_tags, :id => false do |t|
      t.belongs_to :event, index: true, null: false
      t.belongs_to :tag, index: true, null: false
    end
  end
end
