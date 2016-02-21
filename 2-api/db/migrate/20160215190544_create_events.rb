class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
      t.string :name, limit: 30, null: false
      t.text :description, limit: 100, null: false

      t.timestamps null: false
    end
  end
end
