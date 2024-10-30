import { TournamentDivisionModel } from './TournamentDivisionModel';

export const TournamentCategoryModel = () => ({
  category_type: '',                  // t.string "category_type"
  is_league: false,                   // t.boolean "is_league"
  is_tournament: false,               // t.boolean "is_tournament"
  number_of_games: '3',               // t.string "number_of_games"
  score: 21,                          // t.integer "score"
  time_limit: null,                   // t.float "time_limit"
  break_point: null,                  // t.integer "break_point"
  interval_duration: null,            // t.float "interval_duration"
  points_limit: null,                 // t.integer "points_limit"
  division_name_type: '',             // t.string "division_name_type"
  division_number: null,              // t.integer "division_number"
  switch_during_game: true,           // t.boolean "switch_during_game"
  switch_score_during_game: 11,       // t.integer "switch_score_during_game"
  switch_between_games: false,        // t.boolean "switch_between_games"
  match_composition: '',              // t.string "match_composition"
  match_facilitator: '',
  show_score: true,
  show_intervals: false,
  show_time_limit: false,              // t.string "match_facilitator"
  tournament_divisions_attributes: [TournamentDivisionModel()]
});