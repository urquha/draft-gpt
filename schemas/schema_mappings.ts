import { LiveSchema } from './live';
import { FixturesSchema } from './fixtures';
import { GameSchema } from './game';
import { BootstrapStaticSchema } from './bootstrap-static';
import { LeagueDetailsSchema } from './league-details';
import { ElementStatusArraySchema } from './league-element-status';
import { ChoicesSchema } from './choices';

export const SchemaMappings = {
  'bootstrap-static': BootstrapStaticSchema,
  game: GameSchema,
  'league-details': LeagueDetailsSchema,
  'league-element-status': ElementStatusArraySchema,
  fixtures: FixturesSchema,
  live: LiveSchema,
  choices: ChoicesSchema
};
