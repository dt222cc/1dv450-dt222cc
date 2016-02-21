class CreatePositions < ActiveRecord::Migration
  def change
    create_table :positions do |t|
      t.float :longitude, null: false
      t.float :latitude, null: false

      t.timestamps null: false
    end
  end
end
