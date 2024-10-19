import { TournamentCategoryModel } from './TournamentCategoryModel';
import { TournamentVenueModel } from './TournamentVenueModel';

export const TournamentFormModel = {
  // Step 1 fields
  name: '',                           // t.string "name"
  event_date: '',                 // t.date "event_date"
  registration_start: '',        // t.time "registration_time"
  organization_name: '',              // t.string "organization_name"
  payment_method: '',                 // t.string "payment_method"
  match_start_time: '',               // t.time "match_start_time"
  match_overview: '',                 // t.string "match_overview"
  organizer: '',                      // t.string "organizer"
  administrator: '',                  // t.string "administrator"
  sponsor: '',                        // t.string "sponsor"
  event_category: '',                 // t.string "event_category"
  days_schedule: '',                  // t.string "days"
  reception_period: '',               // t.string "reception_period"
  competition_format: '',             // t.string "competition_format"
  max_participants: '',               // t.string "capacity"
  competition_rules: '',              // t.text "competition_rules"
  ball_type: '',                      // t.string "ball_type"
  participation_eligibility: '',      // t.string "participation_eligibility"
  participation_payment_method: '',   // t.string "payment_method_for_participant"
  application_method: '',             // t.string "application_method"
  application_deadline: '',           // t.string "application_deadline"
  pairing_selection_method: '',       // t.string "pairing_selection_method"
  award_details: '',                  // t.text "award_details"
  member_changes: '',                 // t.string "presence_of_member_changes"
  entry_in_multiple_events: '',          // t.string "entry_in_multiple_events"
  cancellation_after_application: '', // t.string "cancellation_after_application"
  participation_fee: '',              // t.string "participation_fee"
  inquiry_contact_information: '',           // t.string "inquiry_contact_information"
  announcements: '',                  // t.string "announcements"
  organizers_url: '',                 // t.string "organizers_url"
  notes_for_organizers: '',                          // t.text "notes_for_organizers"
  user_id: null,                      // t.bigint "user_id"

  tournament_categories_attributes: [TournamentCategoryModel],           // Using category model
  tournament_venues_attributes: [TournamentVenueModel],   // Array of venue models
  tournament_divisions_attributes: [TournamentDivisionModel]
};