import { LiveSchema } from './schemas/live';
import { FixturesSchema } from './schemas/fixtures';
import { GameSchema } from './schemas/game';
import { BootstrapStaticSchema } from './schemas/bootstrap-static';
import { LeagueDetailsSchema } from './schemas/league-details';
import { ElementStatusArraySchema } from './schemas/league-element-status';

export const SchemaMappings = {
  'bootstrap-static': BootstrapStaticSchema,
  game: GameSchema,
  'league-details': LeagueDetailsSchema,
  'league-element-status': ElementStatusArraySchema,
  fixtures: FixturesSchema,
  live: LiveSchema,
};
