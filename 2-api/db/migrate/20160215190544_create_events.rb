class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.belongs_to :creator, index: true
      t.belongs_to :position, index: true

      t.string :name, limit: 30, null: false
      t.text :description, limit: 200, null: false

      t.timestamps null: false
    end
  end
end
