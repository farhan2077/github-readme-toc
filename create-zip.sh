#!/bin/bash

# Read the version from the manifest.json file
VERSION=$(sed -n 's/.*"version": "\(.*\)".*/\1/p' manifest.json)

# Define the output zip file name
OUTPUT_FILE="github-readme-toc-$VERSION.zip"

# Define the files and directories to include in the zip
INCLUDE_FILES=("icons" "scripts" "manifest.json")

# Create the zip file
zip -r "./store/$OUTPUT_FILE" "${INCLUDE_FILES[@]}"

# Print a success message
echo "Created $OUTPUT_FILE with the following contents:"
unzip -l "$OUTPUT_FILE"
