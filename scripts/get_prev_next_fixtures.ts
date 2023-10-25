import * as fs from 'fs';
import { pipe } from 'fp-ts/function';
import { filter } from 'fp-ts/Array';
import { map } from 'fp-ts/Array';

const gameData = fs.readFileSync('data/game.json', 'utf8');
const game = JSON.parse(gameData);
const gameweek = game.current_event;
const nextGameweek = gameweek + 1;

const rawData = fs.readFileSync('data/league-details.json', 'utf8');
const data = JSON.parse(rawData);

const teams = data.league_entries;
const matches = data.matches;

const predicate = (item: { event: number }) =>
  item.event === gameweek || item.event === nextGameweek;

const filteredData = pipe(matches, filter(predicate));
const fullData = pipe(
  filteredData,
  map((item) => {
    const homeTeam = teams.find(
      (team: { id: number }) => team.id === item.league_entry_1,
    );
    const awayTeam = teams.find(
      (team: { id: number }) => team.id === item.league_entry_2,
    );
    return {
      event: item.event,
      homeTeam: homeTeam?.entry_name,
      awayTeam: awayTeam?.entry_name,
      // homeTeamId: homeTeam?.id,
      // awayTeamId: awayTeam?.id,
      homeTeamShortName: homeTeam?.short_name,
      awayTeamShortName: awayTeam?.short_name,
      homeTeamFullName:
        homeTeam?.player_first_name + ' ' + homeTeam?.player_last_name,
      awayTeamFullName:
        awayTeam?.player_first_name + ' ' + awayTeam?.player_last_name,
      homeTeamWaiverPick: homeTeam?.waiver_pick,
      awayTeamWaiverPick: awayTeam?.waiver_pick,
      finished: item.finished,
      homeTeamPoints: item.league_entry_1_points,
      awayTeamPoints: item.league_entry_2_points,
      started: item.started,
      result: item.started
        ? item.league_entry_1_points > item.league_entry_2_points
          ? 'H'
          : item.league_entry_1_points < item.league_entry_2_points
          ? 'A'
          : 'D'
        : null,
      winner: item.started
        ? item.league_entry_1_points > item.league_entry_2_points
          ? homeTeam?.entry_name
          : item.league_entry_1_points < item.league_entry_2_points
          ? awayTeam?.entry_name
          : 'Draw'
        : null,
    };
  }),
);

const outputData = JSON.stringify(fullData, null, 2);
fs.writeFileSync('output/get_prev_next_fixtures.json', outputData);
