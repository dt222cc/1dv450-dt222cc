class CreateApps < ActiveRecord::Migration
  def change
    create_table :apps do |t|
      t.belongs_to :user, index: true
      
      t.string :name, limit: 30, null: false
      t.text :description, limit: 100
      t.string :key, null: false
      
      t.timestamps null: false
    end
  end
end
