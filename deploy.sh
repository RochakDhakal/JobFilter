#!/usr/bin/env sh
set -e
yarn build
cd dist

git init
git add -A
git commit -m 'deploy'

#git push -f https://github.com/RochakDhakal/JobFilter.git main:gh-pages

cd -