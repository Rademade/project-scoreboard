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

ActiveRecord::Schema.define(version: 20170707140658) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "jira_accounts", force: :cascade do |t|
    t.string   "username"
    t.string   "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string   "site"
  end

  create_table "projects", force: :cascade do |t|
    t.string   "name"
    t.integer  "jira_account_id"
    t.datetime "created_at",                                            null: false
    t.datetime "updated_at",                                            null: false
    t.integer  "jira_board_id"
    t.string   "jira_story_points_field", default: "customfield_10022"
    t.index ["jira_account_id"], name: "index_projects_on_jira_account_id", using: :btree
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
    t.integer  "position"
  end

  create_table "sprints", force: :cascade do |t|
    t.integer "project_id"
    t.string  "name",                             null: false
    t.float   "planned_velocity",   default: 0.0, null: false
    t.float   "deviation_velocity", default: 0.0, null: false
    t.date    "started_at",                       null: false
    t.date    "ended_at",                         null: false
    t.index ["project_id"], name: "index_sprints_on_project_id", using: :btree
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
    t.integer  "position"
    t.index ["role_id"], name: "index_users_on_role_id", using: :btree
  end

end
