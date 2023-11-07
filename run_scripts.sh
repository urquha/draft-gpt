#!/bin/bash

# Define the directory to look in; replace with your directory
DIRECTORY="./scripts"

bun install
pip3 install -r requirements.txt

# Iterate over each file in the directory
for filename in "$DIRECTORY"/*; do
  # Check the file extension
  case $filename in
    *.py)
      echo "Running Python file $filename"
      python3 "$filename"
      ;;
    *.ts)
      echo "Running TypeScript file $filename"
      # Compile TypeScript to JavaScript
      bun run "$filename"
     
      ;;
    *)
      echo "Skipping unknown file $filename"
      ;;
  esac
done
