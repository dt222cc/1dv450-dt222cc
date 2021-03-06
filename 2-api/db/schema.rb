# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160221221752) do

  create_table "apps", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "name",        limit: 30,  null: false
    t.text     "description", limit: 100
    t.string   "key",                     null: false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "apps", ["user_id"], name: "index_apps_on_user_id"

  create_table "creators", force: :cascade do |t|
    t.string   "email",                      null: false
    t.string   "displayname",     limit: 30, null: false
    t.string   "password_digest",            null: false
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
  end

  create_table "events", force: :cascade do |t|
    t.integer  "creator_id"
    t.integer  "position_id"
    t.string   "name",        limit: 30,  null: false
    t.text     "description", limit: 200, null: false
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  add_index "events", ["creator_id"], name: "index_events_on_creator_id"
  add_index "events", ["position_id"], name: "index_events_on_position_id"

  create_table "events_tags", id: false, force: :cascade do |t|
    t.integer "event_id", null: false
    t.integer "tag_id",   null: false
  end

  add_index "events_tags", ["event_id"], name: "index_events_tags_on_event_id"
  add_index "events_tags", ["tag_id"], name: "index_events_tags_on_tag_id"

  create_table "positions", force: :cascade do |t|
    t.string   "address_city"
    t.float    "longitude"
    t.float    "latitude"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  create_table "tags", force: :cascade do |t|
    t.string   "name",       limit: 30, null: false
    t.datetime "created_at",            null: false
    t.datetime "updated_at",            null: false
  end

  add_index "tags", ["name"], name: "index_tags_on_name"

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "password_digest", null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

end
