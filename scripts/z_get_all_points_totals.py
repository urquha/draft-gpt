import pandas as pd

fixtures = pd.read_json('output/master_fixtures.json')
results = fixtures[fixtures['finished'] == True]

home_results = results[['event', 'homeTeam', 'homeTeamPoints', 'homeTeamShortName', 'homeTeamFullName', 'result']]
away_results = results[['event', 'awayTeam', 'awayTeamPoints', 'awayTeamShortName', 'awayTeamFullName', 'result']]
home_results.columns = ['event', 'team', 'points', 'shortName', 'fullName', 'result']
home_results.loc[:, 'result'] = home_results['result'].apply(lambda x: "W" if x == "H" else "D" if x == "D" else "L")
away_results.columns = ['event', 'team', 'points', 'shortName', 'fullName', 'result']
away_results.loc[:, 'result'] = away_results['result'].apply(lambda x: "W" if x == "A" else "D" if x == "D" else "L")
all_results = pd.concat([home_results, away_results]).sort_values('event')

all_results.to_csv('output/all_results_points.csv', index=False)