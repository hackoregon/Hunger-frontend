#! /bin/bash
# A script to deploy the latest Hunger-frontend develop branch to gh-pages

echo "Deploying branch 'develop' to gh-pages..."

git checkout develop;

if git pull --rebase -X their origin develop; then
  echo "pulled most recent changes from 'develop'"
else
  echo "error: couldn't pull from origin 'develop'"
  exit 1
fi

git branch -D gh-pages;
git checkout -b gh-pages;

if git pull --rebase -X ours origin gh-pages; then
  echo "git pulled most recent 'gh-pages'"
else
  echo "error: couldn't pull most recent changes"
  exit 1
fi

if npm run build; then
  echo "build successful"
else
  echo "error: build failed"
  exit 1
fi

git rm index.js.map
echo "adding build files...";
if git add -f index.js; then
  echo "git added build files"
else
  echo "error: adding build files failed."
  echo "Did the npm build succeed?"
  echo "Is the build file named index.js?"
  exit 1
fi

echo "committing changes..."
git commit -m "add latest build";


echo "pushing changes..."
if git push -u origin gh-pages; then
  echo "successfully pushed changes to gh-pages branch"
else
  echo "error: could not push changes"
  exit 1
fi

git checkout develop;
echo "success!"
exit 0
