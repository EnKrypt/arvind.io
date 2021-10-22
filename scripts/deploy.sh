#!/bin/sh

rm -rf ./.next/ ./out/
ANALYZE=true next build
next export
cp ./.next/analyze/client.html ./out/bundle.html
rm -rf ./out/_next/data
rm -rf ../arvind.io-build/public/
cp -r ./out ../arvind.io-build/public
cd ../arvind.io-build
sh mergecomment.sh
git add .
git commit -m "Generated production build"
git push
