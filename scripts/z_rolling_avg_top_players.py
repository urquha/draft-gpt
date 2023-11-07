import pandas as pd
import json
import matplotlib.pyplot as plt
import seaborn as sns

players = pd.read_csv('output/master_player_stats.csv')
form_players = players[players['form'] > 2]


top_players = players[players['total_points'] > 10].sort_values('total_points', ascending=False)
lst = [] 
for i in range(1, 11):
    with open(f"data/live/{i}.json") as f:
        live_scores = json.load(f)
        for index, row in top_players.iterrows():
            try:
                gw_points = live_scores['elements'][str(row['id'])]['stats']['total_points'] + live_scores['elements'][str(row['id'])]['stats']['bonus']

                lst.append({'id': row['id'], 'gw': i, 'points': gw_points, 'name': row['first_name'] + ' ' + row['second_name']})
            except:
                print(f"Player {row['second_name']} not found in GW {i}")
df = pd.DataFrame(lst)

df.to_csv('output/top_players_points_per_week.csv', index=False)

# Calculate the rolling average for points over a 5-game week window for each player
window_size = 5

# Sort the DataFrame by 'id' and 'gw' to make sure the rolling average is computed correctly
df_sorted = df.sort_values(by=['id', 'gw'])

# Calculate the rolling average
df_sorted['rolling_avg'] = df_sorted.groupby('id')['points'].transform(lambda x: x.rolling(window=window_size, min_periods=1).mean())
df_sorted.to_csv('output/top_players_points_per_week_rolling_avg.csv', index=False)
x = df_sorted[df_sorted['gw'] > 4].groupby('name').max()

df_filtered = df_sorted[df_sorted['name'].isin(x[x['rolling_avg'] > 8].index)]

# Generating a list of distinct colors for the teams
# distinct_colors = sns.color_palette("husl", len(all_results_points_df['shortName'].unique()))

# Creating a dictionary to map team names to distinct colors
# color_mapping = dict(zip(all_results_points_df['shortName'].unique(), distinct_colors))


# import matplotlib.pyplot as plt
# plt.figure(figsize=(15, 8))
# for idx, player in enumerate(df_filtered['name'].unique()):
#     player_data = df_filtered[df_filtered['name'] == player]
#     plt.plot(player_data['gw'], player_data['rolling_avg'], marker='o', label=player)
#     # plt.annotate(player, (player_data['gw'].iloc[-1], player_data['rolling_avg'].iloc[-1]), textcoords="offset points", xytext=(0,10), ha='center')

# plt.title('Rolling Average of Points by Selected Players per Game Week (Annotated)')
# plt.xlabel('Game Week')
# plt.ylabel('Rolling Average of Points')
# plt.legend(title='Player')
# plt.tight_layout()
# plt.show()