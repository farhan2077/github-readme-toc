#!/bin/bash

# get version from manifest.json
VERSION=$(sed -n 's/.*"version": "\(.*\)".*/\1/p' manifest.json)
INCLUDE_FILES=("icons" "src" "manifest.json")
OUTPUT_FILE="github-readme-toc-$VERSION.zip"

# remove any existing files with a .zip extension inside ./store
find ./store -type f -name "*.zip" -delete

# create zip
zip -r "./store/$OUTPUT_FILE" "${INCLUDE_FILES[@]}"

echo "Created $OUTPUT_FILE with the following contents:"

# show what is in the output zip file
unzip -l "./store/$OUTPUT_FILE"