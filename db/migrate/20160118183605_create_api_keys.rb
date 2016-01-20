class CreateApiKeys < ActiveRecord::Migration
  def change
    create_table :api_keys do |t|
      t.belongs_to :user, index: true
      
      t.string :app_name
      t.text :description, limit: 100
      t.string :key
      
      t.timestamps null: false
    end
  end
end
