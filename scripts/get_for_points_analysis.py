import pandas as pd

fixtures_df = pd.read_json('output/master_fixtures.json')
short_names = fixtures_df['homeTeamShortName'].unique()
# Get the fixtures for the next gameweek
for short_name in short_names:
   fixtures_df[f"{short_name}Points"] = fixtures_df.apply(lambda row: row['homeTeamPoints'] if row['homeTeamShortName'] == short_name else 0, axis=1) + fixtures_df.apply(lambda row: row['awayTeamPoints'] if row['awayTeamShortName'] == short_name else 0, axis=1)

grouped_fixtures_df = fixtures_df.groupby('event').sum()

grouped_fixtures_df.loc[:, 'totalPoints'] = grouped_fixtures_df['homeTeamPoints'] + grouped_fixtures_df['awayTeamPoints']
grouped_fixtures_df = grouped_fixtures_df[grouped_fixtures_df['totalPoints'] > 0]
grouped_fixtures_df.loc[:, 'homeWins'] = grouped_fixtures_df['result'].apply(lambda row: row.count('H'))
grouped_fixtures_df.loc[:, 'awayWins'] = grouped_fixtures_df['result'].apply(lambda row: row.count('A'))
grouped_fixtures_df = grouped_fixtures_df[['totalPoints', 'homeTeamPoints', 'awayTeamPoints',
       'GDPoints', 'NIPoints', 'RWPoints',
       'RFPoints', 'auPoints', 'TWPoints', 'BMPoints', 'JKPoints', 'homeWins', 'awayWins']]
grouped_fixtures_df.to_csv('output/gameweek_analysis.csv')
