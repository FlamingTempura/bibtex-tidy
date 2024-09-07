#!/bin/bash

# To trigger a release, use npm version patch

# Generate the change log from the git log
echo "" >> CHANGELOG.md
echo "### v$npm_package_version" >> CHANGELOG.md
echo '' >> CHANGELOG.md
git log $(git describe --tags --abbrev=0)..HEAD --pretty=format:"- %s" >> CHANGELOG.md

# Build everything so they contain new version
npm run build

# Allow reviewing staged changes
echo ""
read -p "Ready for release? (Please review/edit changelog then press &) " -n 1 -r
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
  exit 1
fi

git add -A