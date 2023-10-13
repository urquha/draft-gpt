import { Type } from '@sinclair/typebox';

export const GameSchema = Type.Object({
  current_event: Type.Number(),
  current_event_finished: Type.Boolean(),
  next_event: Type.Number(),
  processing_status: Type.String(),
  trades_time_for_approval: Type.Boolean(),
  waivers_processed: Type.Boolean(),
});
