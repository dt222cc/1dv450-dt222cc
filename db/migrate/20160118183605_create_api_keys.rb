class CreateApiKeys < ActiveRecord::Migration
  def change
    create_table :api_keys do |t|
      t.references :user
      
      t.string :app_name, null: false
      t.string :key, null: false
      
      t.timestamps null: false
    end
  end
end
