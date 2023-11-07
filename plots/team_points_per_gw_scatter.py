import plotly as plt
import pandas as pd
import seaborn as sns

all_results_points_df = pd.read_csv('output/all_results_points.csv')

# To make overlapping points more visible, we can add a small amount of "jitter" to the data points.
# This will spread them out slightly along the x-axis.

plt.figure(figsize=(15, 10))
sns.stripplot(x='shortName', y='points', hue='result', data=all_results_points_df_sorted, jitter=True, dodge=True, marker='o', alpha=0.7, s=10, palette="tab10")

# Add title and labels
plt.title('Scatter Plot of Points for Each Team (with Jitter)')
plt.ylabel('Points Scored')
plt.xlabel('Team (Short Name)')

# Add a legend to explain the colors
plt.legend(title='Result', bbox_to_anchor=(1.05, 1), loc='upper left')

# Rotate x-axis labels for better readability
plt.xticks(rotation=45)

# Show the plot
plt.show()
