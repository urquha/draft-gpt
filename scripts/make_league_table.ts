import * as fs from 'fs';
import { pipe } from 'fp-ts/function';
import { map } from 'fp-ts/Array';

const rawData = fs.readFileSync('data/league-details.json', 'utf8');
const data = JSON.parse(rawData);
const standings = data.standings;
const leagueEntries = data.league_entries;
const matches = data.matches;
// Filter matches to be only including matches that have been played
const playedMatches = matches.filter(
  (match: { finished: boolean }) => match.finished === true,
);
// Find out what the last event played was
const lastEvent = playedMatches.reduce(
  (max: number, match: { event: number }) =>
    match.event > max ? match.event : max,
  0,
);
// Filter matches to only include matches from the last event and the 4 before
const last5Matches = playedMatches.filter(
  (match: { event: number }) =>
    match.event >= lastEvent - 4 && match.event <= lastEvent,
);

import { array, record } from 'fp-ts';
// Define a type for the transformed records
type MatchRecord = {
  event: number;
  teamId: number;
  result: 'W' | 'L' | 'D';
  points: number;
};

const processFixture = (fixture): MatchRecord[] => {
  let result1: MatchRecord['result'];
  let result2: MatchRecord['result'];

  if (fixture.league_entry_1_points > fixture.league_entry_2_points) {
      result1 = 'W';
      result2 = 'L';
  } else if (fixture.league_entry_1_points < fixture.league_entry_2_points) {
      result1 = 'L';
      result2 = 'W';
  } else {
      result1 = result2 = 'D';
  }

  return [
      {
          event: fixture.event,
          teamId: fixture.league_entry_1,
          result: result1,
          points: fixture.league_entry_1_points,
      },
      {
          event: fixture.event,
          teamId: fixture.league_entry_2,
          result: result2,
          points: fixture.league_entry_2_points,
      },
  ];
};

const matchRecords = pipe(
  last5Matches,
  array.chain(processFixture)
);

// Step 1: Group by team ID
const groupedByTeam = pipe(
  matchRecords,
  array.reduce(new Map<number, MatchRecord[]>(), (acc, record) => {
      const records = acc.get(record.teamId) || [];
      records.push(record);
      acc.set(record.teamId, records);
      return acc;
  })
);
// Convert Map to Record
const groupedByTeamRecord: Record<number, MatchRecord[]> = {};
groupedByTeam.forEach((value, key) => {
    groupedByTeamRecord[key] = value;
});
// Step 2: Aggregate data for each team
const aggregatedData = pipe(
  groupedByTeamRecord,
  record.map(records => {
      // Ensure the records are in chronological order
      records.sort((a, b) => a.event - b.event);

      const totalPoints = records.reduce((sum, record) => sum + record.points, 0);
      const resultsString = records.map(record => {
          switch (record.result) {
              case 'W': return 'W';
              case 'L': return 'L';
              case 'D': return 'D';
          }
      }).join('');

      return {
          totalPoints,
          resultsString
      };
  })
);

// Assuming aggregatedData is your current result
const flattenedData = Object.entries(aggregatedData).map(([teamId, data]) => ({
  teamId: parseInt(teamId),
  totalPoints: data.totalPoints,
  resultsString: data.resultsString
}));

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
    const form_entries = flattenedData.find(
      (team: { teamId: number }) => team.teamId === item.league_entry,
    );
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
      form: form_entries?.resultsString || 0,
      formPoints: form_entries?.totalPoints || 0,
      formVariance: ((form_entries?.totalPoints || 0 )/ 5) - (item.points_for/ (item.matches_won + item.matches_drawn + item.matches_lost))
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


    // Convert JSON object to a string
const textData = JSON.stringify(outputData, null, 4); // 'null, 4' for pretty print

// Save the string to a text file
fs.writeFile('output/master_league_table.txt', textData, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
});