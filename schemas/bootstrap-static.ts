import { Type } from '@sinclair/typebox';
import { FixtureSchema } from './fixtures';

const ElementSchema = Type.Object({
  id: Type.Number(),
  assists: Type.Number(),
  bonus: Type.Number(),
  bps: Type.Number(),
  clean_sheets: Type.Number(),
  creativity: Type.String(),
  goals_conceded: Type.Number(),
  goals_scored: Type.Number(),
  ict_index: Type.String(),
  influence: Type.String(),
  minutes: Type.Number(),
  own_goals: Type.Number(),
  penalties_missed: Type.Number(),
  penalties_saved: Type.Number(),
  red_cards: Type.Number(),
  saves: Type.Number(),
  threat: Type.String(),
  yellow_cards: Type.Number(),
  starts: Type.Number(),
  expected_goals: Type.String(),
  expected_assists: Type.String(),
  expected_goal_involvements: Type.String(),
  expected_goals_conceded: Type.String(),
  added: Type.String(),
  chance_of_playing_next_round: Type.Any(),
  chance_of_playing_this_round: Type.Any(),
  code: Type.Number(),
  draft_rank: Type.Number(),
  dreamteam_count: Type.Number(),
  ep_next: Type.Null(),
  ep_this: Type.Null(),
  event_points: Type.Number(),
  first_name: Type.String(),
  form: Type.String(),
  in_dreamteam: Type.Boolean(),
  news: Type.String(),
  news_added: Type.Any(),
  news_return: Type.Null(),
  news_updated: Type.Null(),
  points_per_game: Type.String(),
  second_name: Type.String(),
  squad_number: Type.Null(),
  status: Type.String(),
  total_points: Type.Number(),
  web_name: Type.String(),
  influence_rank: Type.Number(),
  influence_rank_type: Type.Number(),
  creativity_rank: Type.Number(),
  creativity_rank_type: Type.Number(),
  threat_rank: Type.Number(),
  threat_rank_type: Type.Number(),
  ict_index_rank: Type.Number(),
  ict_index_rank_type: Type.Number(),
  form_rank: Type.Null(),
  form_rank_type: Type.Null(),
  points_per_game_rank: Type.Null(),
  points_per_game_rank_type: Type.Null(),
  corners_and_indirect_freekicks_order: Type.Null(),
  corners_and_indirect_freekicks_text: Type.String(),
  direct_freekicks_order: Type.Null(),
  direct_freekicks_text: Type.String(),
  penalties_order: Type.Null(),
  penalties_text: Type.String(),
  element_type: Type.Number(),
  team: Type.Number(),
});

const ElementsSchema = Type.Array(ElementSchema);

const ElementTypeSchema = Type.Object({
  id: Type.Number(),
  element_count: Type.Number(),
  singular_name: Type.String(),
  singular_name_short: Type.String(),
  plural_name: Type.String(),
  plural_name_short: Type.String(),
});

const ElementTypesSchema = Type.Array(ElementTypeSchema);

const ElementStatSchema = Type.Object({
  name: Type.String(),
  label: Type.String(),
  abbreviation: Type.String(),
  is_match_stat: Type.Boolean(),
  match_stat_order: Type.Union([Type.Null(), Type.Number()]),
  sort: Type.String(),
});
const ElementStatsSchema = Type.Array(ElementStatSchema);

const EventSchema = Type.Object({
  average_entry_score: Type.Union([Type.Null(), Type.Number()]),
  deadline_time: Type.String(),
  id: Type.Number(),
  name: Type.String(),
  finished: Type.Boolean(),
  highest_scoring_entry: Type.Union([Type.Null(), Type.Number()]),
  trades_time: Type.String(),
  waivers_time: Type.String(),
});

const DataSchema = Type.Array(EventSchema);

const EventsSchema = Type.Object({
  current: Type.Number(),
  data: DataSchema,
  next: Type.Number(),
});

const GameWeekSchema = Type.Object({
  weekNumber: Type.Number(),
  fixtures: Type.Array(FixtureSchema),
});

const GameWeeksArraySchema = Type.Array(GameWeekSchema);


const FixturesSchema = Type.Object({
  fixtures: GameWeeksArraySchema
});


const LeagueSettings = Type.Object({
  default_entries: Type.Number(),
  draft_reminder_hours: Type.Array(Type.Number()),
  draft_postpone_hours: Type.Number(),
  draft_pushback_times: Type.Number(),
  h2h_draw: Type.Number(),
  h2h_lose: Type.Number(),
  h2h_win: Type.Number(),
  max_entries: Type.Number(),
  min_entries: Type.Number(),
  private_max: Type.Number(),
  public_draft_delay_minutes: Type.Number(),
  public_draft_tz_default: Type.String(),
  public_entry_sizes: Type.Array(Type.Number()),
  public_max: Type.Number()
});

const ScoringSettings = Type.Object({
  long_play_limit: Type.Number(),
  short_play: Type.Number(),
  long_play: Type.Number(),
  concede_limit: Type.Number(),
  goals_conceded_GKP: Type.Number(),
  goals_conceded_DEF: Type.Number(),
  goals_conceded_MID: Type.Number(),
  goals_conceded_FWD: Type.Number(),
  saves_limit: Type.Number(),
  saves: Type.Number(),
  goals_scored_GKP: Type.Number(),
  goals_scored_DEF: Type.Number(),
  goals_scored_MID: Type.Number(),
  goals_scored_FWD: Type.Number(),
  assists: Type.Number(),
  clean_sheets_GKP: Type.Number(),
  clean_sheets_DEF: Type.Number(),
  clean_sheets_MID: Type.Number(),
  clean_sheets_FWD: Type.Number(),
  penalties_saved: Type.Number(),
  penalties_missed: Type.Number(),
  yellow_cards: Type.Number(),
  red_cards: Type.Number(),
  own_goals: Type.Number(),
  bonus: Type.Number()
});

const SquadSettings = Type.Object({
  size: Type.Number(),
  select_GKP: Type.Number(),
  select_DEF: Type.Number(),
  select_MID: Type.Number(),
  select_FWD: Type.Number(),
  play: Type.Number(),
  min_play_GKP: Type.Number(),
  max_play_GKP: Type.Number(),
  min_play_DEF: Type.Number(),
  max_play_DEF: Type.Number(),
  min_play_MID: Type.Number(),
  max_play_MID: Type.Number(),
  min_play_FWD: Type.Number(),
  max_play_FWD: Type.Number(),
  position_type_locks: Type.Record(Type.String(), Type.String()),
  captains_disabled: Type.Boolean()
});

const TransactionsSettings = Type.Object({
  new_element_locked_hours: Type.Number(),
  trade_veto_minimum: Type.Number(),
  trade_veto_hours: Type.Number(),
  waivers_before_start_min_hours: Type.Number(),
  waivers_before_deadline_hours: Type.Number(),
  waivers_before_deadline_hours_event: Type.Record(Type.String(), Type.Number()),
});

const UISettings = Type.Object({
  special_shirt_exclusions: Type.Array(Type.Any()),
  use_special_shirts: Type.Boolean()
});

const SettingsSchema = Type.Object({
  league: LeagueSettings,
  scoring: ScoringSettings,
  squad: SquadSettings,
  transactions: TransactionsSettings,
  ui: UISettings
});

const TeamSchema = Type.Object({
  code: Type.Number(),
  id: Type.Number(),
  name: Type.String(),
  pulse_id: Type.Number(),
  short_name: Type.String()
});

const TeamsSchema = Type.Array(TeamSchema);

export const BootstrapStaticSchema = Type.Object({
  elements: ElementsSchema,
  element_stats: ElementStatsSchema,
  element_types: ElementTypesSchema,
  events: EventsSchema,

  // fixtures: FixturesSchema,
  settings: SettingsSchema,
  teams: TeamsSchema,
});