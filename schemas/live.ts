import { Type } from '@sinclair/typebox';

import { FixturesSchema } from './fixtures';

// Define the schema for the stats field
const StatsSchema = Type.Object({
minutes: Type.Number(),
goals_scored: Type.Number(),
assists: Type.Number(),
clean_sheets: Type.Number(),
goals_conceded: Type.Number(),
own_goals: Type.Number(),
penalties_saved: Type.Number(),
penalties_missed: Type.Number(),
yellow_cards: Type.Number(),
red_cards: Type.Number(),
saves: Type.Number(),
bonus: Type.Number(),
bps: Type.Number(),
influence: Type.Number(),
creativity: Type.Number(),
threat: Type.Number(),
ict_index: Type.Number(),
starts: Type.Number(),
expected_goals: Type.Number(),
expected_assists: Type.Number(),
expected_goal_involvements: Type.Number(),
expected_goals_conceded: Type.Number(),
total_points: Type.Number(),
in_dreamteam: Type.Boolean()
});
// Define the schema for the explain field
const ExplainSchema = Type.Array(
Type.Tuple([Type.Array(Type.Object({
    name: Type.String(),
    points: Type.Number(),
    value: Type.Number(),
    stat: Type.String()
})), Type.Number()])
);

// Define the schema for a single element
const ElementSchema = Type.Object({
    explain: ExplainSchema,
    stats: StatsSchema
});

// Define the schema for the elements field
const ElementsSchema = Type.Record(Type.String(), ElementSchema);

// Define the schema for the entire response
export const LiveSchema = Type.Object({
    elements: ElementsSchema,
    fixtures: FixturesSchema,
});
