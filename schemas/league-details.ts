import { Type } from '@sinclair/typebox';

const LeagueSchema = Type.Object({
  admin_entry: Type.Number(),
  closed: Type.Boolean(),
  draft_dt: Type.Any(),
  draft_pick_time_limit: Type.Number(),
  draft_status: Type.String(),
  draft_tz_show: Type.String(),
  id: Type.Number(),
  ko_rounds: Type.Number(),
  make_code_public: Type.Boolean(),
  max_entries: Type.Number(),
  min_entries: Type.Number(),
  name: Type.String(),
  scoring: Type.String(),
  start_event: Type.Number(),
  stop_event: Type.Number(),
  trades: Type.String(),
  transaction_mode: Type.String(),
  variety: Type.String()
});  

const LeagueEntrySchema = Type.Object({
  entry_id: Type.Number(),
  entry_name: Type.String(),
  id: Type.Number(),
  joined_time: Type.Any(),
  player_first_name: Type.String(),
  player_last_name: Type.String(),
  short_name: Type.String(),
  waiver_pick: Type.Number(),
});

const LeagueEntriesSchema = Type.Array(LeagueEntrySchema);


const MatchSchema = Type.Object({
  event: Type.Number(),
  finished: Type.Boolean(),
  league_entry_1: Type.Number(),
  league_entry_1_points: Type.Number(),
  league_entry_2: Type.Number(),
  league_entry_2_points: Type.Number(),
  started: Type.Boolean(),
  winning_league_entry: Type.Union([Type.Number(), Type.Null()]),
  winning_method: Type.Union([Type.String(), Type.Null()]),
});

const MatchesSchema = Type.Array(MatchSchema);

const StandingSchema = Type.Object({
  last_rank: Type.Number(),
  league_entry: Type.Number(),
  matches_drawn: Type.Number(),
  matches_lost: Type.Number(),
  matches_played: Type.Number(),
  matches_won: Type.Number(),
  points_against: Type.Number(),
  points_for: Type.Number(),
  rank: Type.Number(),
  rank_sort: Type.Number(),
  total: Type.Number(),
});

// Define schema for the 'standings' array
const StandingsSchema = Type.Array(StandingSchema);

export const LeagueDetailsSchema = Type.Object({
  league: LeagueSchema,
  league_entries: LeagueEntriesSchema,
  matches: MatchesSchema,
  standings: StandingsSchema,
});
