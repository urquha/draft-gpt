import pandas as pd

df = pd.read_json("output/master_league_table.json")

df['rank_points'] = (9-df['rank']) 
df['power_form_points'] = df['formPoints'] * 0.05
df['wins'] = df['form'].str.count('W')
df['adjusted_form_variance'] = df['formVariance'] * 0.5
df['adjusted_wins'] = df['wins'] * 2
df['power_points'] = round( df ['adjusted_form_variance'] + df['power_form_points'] + df['rank_points'] + df['adjusted_wins'])

# print(df[['name', 'rank_points', 'power_form_points', 'adjusted_form_variance', 'adjusted_wins', 'power_points']].sort_values('power_points', ascending=False))

# print(df[['name', 'formPoints', 'formVariance', 'form', 'rank',  'power_points']].sort_values('power_points', ascending=False))
power_rankings_df = df[['name', 'formPoints', 'formVariance', 'form', 'rank',  'power_points', 'points_for', 'matches_won']].sort_values('power_points', ascending=False)

text_data = power_rankings_df.to_string()

# Save to a text file
with open('output/power_rankings_df.txt', 'w') as file:
    file.write(text_data)
# df['rank_points'] = (9-df['rank']) 
# df['power_form_points'] = df['points_for'] * 0.05
# df['wins'] = df['matches_won']
# df['adjusted_form_variance'] = df['formVariance'] * 0.5
# df['adjusted_wins'] = df['wins'] * 2
# df['power_points'] =  + df['power_form_points'] + df['rank_points'] + df['adjusted_wins']

# print(df[['name', 'rank_points', 'power_form_points', 'adjusted_form_variance', 'adjusted_wins', 'power_points']].sort_values('power_points', ascending=False))

