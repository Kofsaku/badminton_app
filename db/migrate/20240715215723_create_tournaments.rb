class CreateTournaments < ActiveRecord::Migration[7.0]
  def change
    create_table :tournaments do |t|
      t.string :name
      t.date :event_date
      t.time :registeration_time
      t.string :organization_name
      t.string :payment_method
      t.time :match_start_time
      t.time :match_end_time
      t.string :match_overview
      t.string :organizer
      t.string :administrator
      t.string :sponsor
      t.string :event_category
      t.string :days_schedule
      t.integer :max_participants
      t.string :reception_period
      t.string :competition_format
      t.string :capacity
      t.text :competition_rules
      t.string :ball_type
      t.string :participation_eligibility
      t.string :participation_payment_method
      t.string :application_method
      t.string :application_deadline
      t.string :pairing_selection_method
      t.text :award_details
      t.string :participation_qualification
      t.string :presence_of_member_changes
      t.string :entry_in_multiple_events
      t.string :cancellation_after_application
      t.string :participation_fee
      t.string :announcements
      t.string :organizers_url
      t.string :inquiry_contact_information
      t.text :notes_for_organizers
      t.boolean :is_league
      t.boolean :is_tournament
      t.string :game_number
      t.integer :score
      t.float :time_limit
      t.integer :break_point
      t.float :interval_duration
      t.integer :points_limit
      t.integer :change_ends
      t.integer :division_number
      t.string :member_changes
      t.references :user, null: true, foreign_key: true

      t.timestamps
    end
  end
end
