import * as fs from 'fs';
import { pipe } from 'fp-ts/function';
import { map } from 'fp-ts/Array';

const rawData = fs.readFileSync('data/league-details.json', 'utf8');
const data = JSON.parse(rawData);
const standings = data.standings;
const leagueEntries = data.league_entries;

interface Standing {
  rank: number;
  league_entry: number;
  matches_won: number;
  matches_drawn: number;
  matches_lost: number;
  points_for: number;
  points_against: number;
  total: number;
  last_rank: number;
  rank_sort: number;
  // ... any other properties from your JSON data
}

interface LeagueEntry {
  id: number;
  entry_name: string;
  waiver_pick: string;
  short_name: string;
  player_first_name: string;
  player_last_name: string;
  // ... any other properties from your JSON data
}

type EntryMapValue = {
  entry_name: string;
  waiver_pick: string;
  short_name: string;
  full_name: string;
};

const entriesMap: Map<number, EntryMapValue> = new Map(
  leagueEntries.map((item: LeagueEntry) => [
    item.id,
    {
      entry_name: item.entry_name,
      waiver_pick: item.waiver_pick,
      short_name: item.short_name,
      full_name: `${item.player_first_name} ${item.player_last_name}`,
    },
  ]),
);

const masterLeagueTable = pipe(
  standings,
  map((item: Standing) => {
    const entry = entriesMap.get(item.league_entry) || fallbackEntry;
    return {
      rank: item.rank,
      id: item.league_entry,
      name: entry.entry_name || 'Name not found',
      full_name: entry.full_name || 'Full name not found',
      short_name: entry.short_name || 'Short name not found',
      waiver_pick: entry.waiver_pick || 'Waiver pick not found',
      matches_played: item.matches_won + item.matches_drawn + item.matches_lost,
      matches_won: item.matches_won,
      matches_drawn: item.matches_drawn,
      matches_lost: item.matches_lost,
      points_for: item.points_for,
      points_against: item.points_against,
      total: item.total,
      last_rank: item.last_rank,
      rank_sort: item.rank_sort,
      pointsPerMatch:
        item.points_for /
        (item.matches_won + item.matches_drawn + item.matches_lost),
    };
  }),
);

type FallbackEntryType = {
  entry_name: null;
  waiver_pick: null;
  short_name: null;
  full_name: null;
};

const fallbackEntry: FallbackEntryType = {
  entry_name: null,
  waiver_pick: null,
  short_name: null,
  full_name: null,
};


const outputData = JSON.stringify(masterLeagueTable, null, 2);
fs.writeFileSync('output/master_league_table.json', outputData);
