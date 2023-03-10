#!/bin/sh

# Generates a coverage report

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd "$SCRIPT_DIR/.."

# In coverage mode the binary includes sourcemaps, so we create it in a different place.
# I've only got this working if (a) the sourcemap is inline and (b) the file ends with.js.
export BIBTEX_TIDY_BIN=./.tmp/bibtex-tidy.js

export NODE_ENV=coverage

export NODE_OPTIONS=--enable-source-maps

npm run build

npx c8 \
  --clean \
  --src .tmp \
	--src src \
	--all \
  --include "**/*.ts" \
  --include "**/*.js" \
  --include "**/*.svelte" \
	--reporter html-spa \
  node -r esbuild-register test/index.ts

echo "Coverage report at ${pwd}/coverage/index.html"