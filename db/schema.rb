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

ActiveRecord::Schema.define(version: 20170210203222) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "jira_accounts", force: :cascade do |t|
    t.string   "username"
    t.string   "password"
    t.string   "site"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "jira_helper_fields", force: :cascade do |t|
    t.integer  "rapid_view_id"
    t.string   "story_points_field"
    t.string   "story_status_field"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
  end

  create_table "projects", force: :cascade do |t|
    t.string   "name"
    t.integer  "jira_account_id"
    t.integer  "jira_helper_field_id"
    t.datetime "created_at",           null: false
    t.datetime "updated_at",           null: false
    t.index ["jira_account_id"], name: "index_projects_on_jira_account_id", using: :btree
    t.index ["jira_helper_field_id"], name: "index_projects_on_jira_helper_field_id", using: :btree
  end

  create_table "projects_users", id: false, force: :cascade do |t|
    t.integer "project_id"
    t.integer "user_id"
    t.index ["project_id"], name: "index_projects_users_on_project_id", using: :btree
    t.index ["user_id"], name: "index_projects_users_on_user_id", using: :btree
  end

  create_table "roles", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "first_name"
    t.string   "last_name"
    t.string   "email"
    t.string   "encrypted_password"
    t.boolean  "admin"
    t.integer  "role_id"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.index ["role_id"], name: "index_users_on_role_id", using: :btree
  end

end
