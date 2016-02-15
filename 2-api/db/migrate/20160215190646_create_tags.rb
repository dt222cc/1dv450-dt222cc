class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :name, limit: 30, null: false, index: true

      t.timestamps null: false
    end
  end
end
