import { Type } from '@sinclair/typebox';

// Define the schema for the individual stat entry
const StatEntrySchema = Type.Object({
  element: Type.Number(),
  value: Type.Number(),
});

// Define the schema for the stat category
const StatCategorySchema = Type.Object({
  s: Type.String(),
  h: Type.Array(StatEntrySchema),
  a: Type.Array(StatEntrySchema),
});
// Define the schema for a single fixture
export const FixtureSchema = Type.Object({
  id: Type.Number(),
  started: Type.Boolean(),
  stats: Type.Array(StatCategorySchema),
  code: Type.Number(),
  finished: Type.Boolean(),
  finished_provisional: Type.Boolean(),
  kickoff_time: Type.String(),
  minutes: Type.Number(),
  provisional_start_time: Type.Boolean(),
  team_a_score: Type.Union([Type.Number(), Type.Null()]),
  team_h_score: Type.Union([Type.Number(), Type.Null()]),
  pulse_id: Type.Number(),
  event: Type.Number(),
  team_a: Type.Number(),
  team_h: Type.Number(),
});
export const FixturesSchema = Type.Array(FixtureSchema);
