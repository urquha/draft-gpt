# Draft-GPT

## Description

This project connects to the Fantasy Premier League draft API to fetch data which is then stored in a JSON format. The data is processed using a collection of Python and TypeScript scripts, which are all executable via a single shell script. The processed data is formatted suitably for input into GPT-4, which can be used to generate a narrative describing the events in the fantasy football league.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Installation
This project uses typescript and python for scripts, so need to install for both. We use bun for typescript and PIP for python installation.

# Installation commands
`brew tap oven-sh/bun`

`brew install bun` (if you're on windows download it however works)

`bun install`

`pip install -r requirements.txt`

## Usage
Once the installs are done, then you can run the `index.ts` which which will download all of the data for this week and past. 

When All of the data is fetched, then `runs_scripts.sh` can run all of the scripts in the scripts folder, they will use the raw data to make the CSVs and json in the outputs folder

# Usage commands
###  Scripts
Run index.ts and gets all the data:

`bun run start` 

Produce all the output data:

`./runs_scripts.sh`  


# Formatting
### TypeScript files

`bun prettier --write "*.{ts,tsx}"`

### Python files
`black .`