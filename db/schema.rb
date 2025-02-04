# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2025_01_27_124705) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "categories", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "group_players", force: :cascade do |t|
    t.bigint "match_group_id", null: false
    t.bigint "tournament_player_id"
    t.integer "player_key"
    t.integer "ranking"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["match_group_id"], name: "index_group_players_on_match_group_id"
    t.index ["tournament_player_id"], name: "index_group_players_on_tournament_player_id"
  end

  create_table "match_classes", force: :cascade do |t|
    t.bigint "tournament_id", null: false
    t.bigint "tournament_category_id", null: false
    t.bigint "tournament_division_id", null: false
    t.integer "size", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tournament_category_id"], name: "index_match_classes_on_tournament_category_id"
    t.index ["tournament_division_id"], name: "index_match_classes_on_tournament_division_id"
    t.index ["tournament_id"], name: "index_match_classes_on_tournament_id"
  end

  create_table "match_compositions", force: :cascade do |t|
    t.string "string"
    t.bigint "tournament_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tournament_id"], name: "index_match_compositions_on_tournament_id"
  end

  create_table "match_groups", force: :cascade do |t|
    t.bigint "match_round_id", null: false
    t.integer "group_number", null: false
    t.integer "group_size", null: false
    t.bigint "tournament_venue_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["match_round_id"], name: "index_match_groups_on_match_round_id"
    t.index ["tournament_venue_id"], name: "index_match_groups_on_tournament_venue_id"
  end

  create_table "match_rounds", force: :cascade do |t|
    t.bigint "match_class_id", null: false
    t.integer "round_number", null: false
    t.integer "round_type", null: false
    t.integer "round_size", null: false
    t.integer "number_of_winners", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["match_class_id"], name: "index_match_rounds_on_match_class_id"
  end

  create_table "matches", force: :cascade do |t|
    t.string "match_type"
    t.string "winner"
    t.text "match_log"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "match_time"
    t.integer "match_score_teamA", default: 0
    t.integer "match_score_teamB", default: 0
    t.bigint "timetable_cell_id"
    t.integer "winning_points"
    t.integer "number_of_sets"
    t.string "name", default: "", null: false
    t.integer "status", default: 0
    t.string "player1"
    t.string "player2"
    t.string "player3"
    t.string "player4"
    t.index ["timetable_cell_id"], name: "index_matches_on_timetable_cell_id"
  end

  create_table "profiles", force: :cascade do |t|
    t.string "role"
    t.string "real_name"
    t.string "pet_name"
    t.string "telephone_number"
    t.string "prefecture"
    t.string "address"
    t.string "city"
    t.string "gender"
    t.date "date_of_birth"
    t.integer "years_of_experience"
    t.string "racket"
    t.string "affiliation"
    t.string "age"
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "furigana_name"
    t.string "nick_name"
    t.string "job"
    t.index ["user_id"], name: "index_profiles_on_user_id"
  end

  create_table "tags", force: :cascade do |t|
    t.string "taggable_type", null: false
    t.bigint "taggable_id", null: false
    t.string "value"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["taggable_type", "taggable_id"], name: "index_tags_on_taggable"
  end

  create_table "team_match_orders", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "team_id"
    t.bigint "match_id"
    t.integer "order"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["match_id"], name: "index_team_match_orders_on_match_id"
    t.index ["team_id"], name: "index_team_match_orders_on_team_id"
    t.index ["user_id"], name: "index_team_match_orders_on_user_id"
  end

  create_table "team_members", force: :cascade do |t|
    t.string "name"
    t.string "age"
    t.bigint "team_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["team_id"], name: "index_team_members_on_team_id"
  end

  create_table "team_players", force: :cascade do |t|
    t.bigint "team_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["team_id"], name: "index_team_players_on_team_id"
    t.index ["user_id"], name: "index_team_players_on_user_id"
  end

  create_table "teams", force: :cascade do |t|
    t.string "title"
    t.string "members_count"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "timetable_cells", force: :cascade do |t|
    t.bigint "tournament_player_id"
    t.bigint "second_tournament_player_id"
    t.integer "number", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "tournament_venue_id"
    t.bigint "match_group_id"
    t.integer "player_key"
    t.integer "second_player_key"
    t.index ["match_group_id"], name: "index_timetable_cells_on_match_group_id"
    t.index ["second_tournament_player_id"], name: "index_timetable_cells_on_second_tournament_player_id"
    t.index ["tournament_player_id"], name: "index_timetable_cells_on_tournament_player_id"
    t.index ["tournament_venue_id"], name: "index_timetable_cells_on_tournament_venue_id"
  end

  create_table "timetables", force: :cascade do |t|
    t.bigint "tournament_venue_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.json "memos"
    t.bigint "tournament_id", null: false
    t.index ["tournament_id"], name: "index_timetables_on_tournament_id"
    t.index ["tournament_venue_id"], name: "index_timetables_on_tournament_venue_id"
  end

  create_table "tournament_categories", force: :cascade do |t|
    t.bigint "tournament_id", null: false
    t.string "category_type"
    t.boolean "is_league"
    t.boolean "is_tournament"
    t.string "number_of_games"
    t.integer "score"
    t.float "time_limit"
    t.integer "break_point"
    t.float "interval_duration"
    t.integer "points_limit"
    t.string "division_name_type"
    t.integer "division_number"
    t.boolean "switch_during_game", default: true
    t.integer "switch_score_during_game", default: 11
    t.boolean "switch_between_games"
    t.string "match_composition"
    t.string "match_facilitator"
    t.boolean "show_score"
    t.boolean "show_intervals"
    t.boolean "show_time_limit"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "number_of_members"
    t.jsonb "games", default: [], null: false
    t.index ["tournament_id"], name: "index_tournament_categories_on_tournament_id"
  end

  create_table "tournament_divisions", force: :cascade do |t|
    t.string "division"
    t.integer "participants_limit"
    t.integer "pairs_limit"
    t.integer "trios_limit"
    t.bigint "tournament_category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tournament_category_id"], name: "index_tournament_divisions_on_tournament_category_id"
  end

  create_table "tournament_players", force: :cascade do |t|
    t.string "player_type", null: false
    t.bigint "player_id", null: false
    t.bigint "tournament_id", null: false
    t.string "status"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "tournament_category_id"
    t.bigint "tournament_division_id"
    t.index ["player_type", "player_id"], name: "index_tournament_players_on_player"
    t.index ["tournament_category_id"], name: "index_tournament_players_on_tournament_category_id"
    t.index ["tournament_division_id"], name: "index_tournament_players_on_tournament_division_id"
    t.index ["tournament_id"], name: "index_tournament_players_on_tournament_id"
  end

  create_table "tournament_table_players", force: :cascade do |t|
    t.bigint "tournament_table_id", null: false
    t.bigint "tournament_player_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tournament_player_id"], name: "index_tournament_table_players_on_tournament_player_id"
    t.index ["tournament_table_id"], name: "index_tournament_table_players_on_tournament_table_id"
  end

  create_table "tournament_tables", force: :cascade do |t|
    t.integer "table_type", null: false
    t.integer "size", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "bracket_direction"
    t.bigint "tournament_venue_id"
    t.bigint "timetable_id"
    t.index ["timetable_id"], name: "index_tournament_tables_on_timetable_id"
    t.index ["tournament_venue_id"], name: "index_tournament_tables_on_tournament_venue_id"
  end

  create_table "tournament_venues", force: :cascade do |t|
    t.string "venue_name"
    t.string "venue_address"
    t.integer "no_of_courts"
    t.date "venue_date"
    t.bigint "tournament_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "category_type"
    t.string "division_number"
    t.index ["tournament_id"], name: "index_tournament_venues_on_tournament_id"
  end

  create_table "tournaments", force: :cascade do |t|
    t.string "name"
    t.date "event_date"
    t.string "organization_name"
    t.string "payment_method"
    t.time "match_start_time"
    t.time "match_end_time"
    t.string "match_overview"
    t.string "organizer"
    t.string "administrator"
    t.string "sponsor"
    t.string "event_category"
    t.string "days_schedule"
    t.integer "max_participants"
    t.string "reception_period"
    t.string "competition_format"
    t.string "capacity"
    t.text "competition_rules"
    t.string "ball_type"
    t.string "participation_eligibility"
    t.string "participation_payment_method"
    t.string "application_method"
    t.string "application_deadline"
    t.string "pairing_selection_method"
    t.text "award_details"
    t.string "participation_qualification"
    t.string "presence_of_member_changes"
    t.string "entry_in_multiple_events"
    t.string "cancellation_after_application"
    t.string "participation_fee"
    t.string "announcements"
    t.string "organizers_url"
    t.string "inquiry_contact_information"
    t.text "notes_for_organizers"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "region"
    t.string "prefecture"
    t.date "registeration_time"
    t.text "description"
    t.string "costume_detail"
    t.string "transport_information"
    t.text "note_for_participants"
    t.string "banner"
    t.index ["user_id"], name: "index_tournaments_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "full_name"
    t.string "password_digest"
    t.string "api_key"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "group_players", "match_groups"
  add_foreign_key "group_players", "tournament_players"
  add_foreign_key "match_classes", "tournament_categories"
  add_foreign_key "match_classes", "tournament_divisions"
  add_foreign_key "match_classes", "tournaments"
  add_foreign_key "match_compositions", "tournaments"
  add_foreign_key "match_groups", "match_rounds"
  add_foreign_key "match_groups", "tournament_venues"
  add_foreign_key "match_rounds", "match_classes"
  add_foreign_key "matches", "timetable_cells"
  add_foreign_key "profiles", "users"
  add_foreign_key "team_members", "teams"
  add_foreign_key "team_players", "teams"
  add_foreign_key "team_players", "users"
  add_foreign_key "timetable_cells", "match_groups"
  add_foreign_key "timetable_cells", "tournament_players"
  add_foreign_key "timetable_cells", "tournament_players", column: "second_tournament_player_id"
  add_foreign_key "timetable_cells", "tournament_venues"
  add_foreign_key "timetables", "tournament_venues"
  add_foreign_key "timetables", "tournaments"
  add_foreign_key "tournament_categories", "tournaments"
  add_foreign_key "tournament_divisions", "tournament_categories"
  add_foreign_key "tournament_players", "tournaments"
  add_foreign_key "tournament_table_players", "tournament_players"
  add_foreign_key "tournament_table_players", "tournament_tables", on_delete: :cascade
  add_foreign_key "tournament_tables", "timetables"
  add_foreign_key "tournament_tables", "tournament_venues"
  add_foreign_key "tournament_venues", "tournaments"
  add_foreign_key "tournaments", "users"
end
