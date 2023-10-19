import pandas as pd
import json


columns = ['id', 'assists', 'bonus', 'bps', 'clean_sheets', 'creativity',
       'goals_conceded', 'goals_scored', 'ict_index', 'influence', 'minutes',
       'own_goals', 'penalties_missed', 'penalties_saved', 'red_cards',
       'saves', 'threat', 'yellow_cards', 'starts', 'expected_goals',
       'expected_assists', 'expected_goal_involvements',
       'expected_goals_conceded', 'added', 'code', 'draft_rank',
       'dreamteam_count', 'event_points', 'first_name', 'form', 'in_dreamteam',
       'news', 'points_per_game', 'second_name', 'status', 'total_points',
       'web_name', 'influence_rank', 'influence_rank_type', 'creativity_rank',
       'creativity_rank_type', 'threat_rank', 'threat_rank_type',
       'ict_index_rank', 'ict_index_rank_type',
       'corners_and_indirect_freekicks_text', 'direct_freekicks_text',
       'penalties_text', 'element_type', 'team']


with open('data/bootstrap-static.json') as f:
    data = json.load(f)
    df = pd.DataFrame(data["elements"]).dropna(axis=1, how='any')

dream_team_df = df[df['in_dreamteam'] == True]

owners = pd.read_json('data/league-element-status.json')['element_status'].apply(pd.Series)

with open('data/league-details.json') as f:
    data = json.load(f)
    league_entries_df = pd.DataFrame(data["league_entries"]).dropna(axis=1, how='any')[['entry_id', 'entry_name', 'short_name']]
league_entries_df

players_owners = pd.merge(owners, league_entries_df, left_on='owner', right_on='entry_id', how='left')

master_player_stats = pd.merge(df, players_owners, left_on='id', right_on='element').sort_values(['total_points', 'bps'], ascending=False)
master_player_stats.to_csv('output/master_player_stats.csv')