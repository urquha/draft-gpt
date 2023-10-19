import { Type } from '@sinclair/typebox';
import { ElementStatusSchema } from './league-element-status';

export const ChoiceSchema = Type.Object({
  choice_time: Type.String(),
  element: Type.Number(),
  entry: Type.Number(),
  entry_name: Type.String(),
  id: Type.Number(),
  index: Type.Number(),
  league: Type.Number(),
  pick: Type.Number(),
  player_first_name: Type.String(),
  player_last_name: Type.String(),
  round: Type.Number(),
  seconds_to_pick: [Type.Number(), Type.Null()],
  was_auto: Type.Boolean(),
});

export const ChoicesSchema = Type.Object({
  choices: Type.Array(ChoiceSchema),
  idle: Type.Any(),
  element_status: Type.Array(ElementStatusSchema),
});