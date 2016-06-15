#! /bin/bash
# A script to deploy the latest Hunger-frontend develop branch to gh-pages
# colored output for successful operations and failures
# Green text: echo -e "\e[32mGREEN\e[0m"
# Red text: echo -e "\e[31mRED\e[0m"

echo "Deploying branch 'develop' to gh-pages..."
if git checkout develop; then
  echo -e "\e[32mchecked out branch 'develop'\e[0m"
else
  echo -e "\e[31merror: couldn't checkout 'develop'."
  echo -e "Are you in the Hunger-frontend repo? Is you current branch clean?\e[0m"
  exit 1
fi

if git pull --rebase -X theirs origin develop; then
  echo -e "\e[32mpulled most recent changes from 'develop'\e[0m"
else
  echo -e "\e[31merror: couldn't pull from 'develop'\e[0m"
  exit 1
fi

echo "pulling from origin 'gh-pages'..."
if git pull --rebase -X ours origin gh-pages; then
  echo -e "\e[32mpulled from origin 'gh-pages' (in favor of our version)\e[0m"
else
  echo -e "\e[31merror: couldn't pull most recent changes\e[0m"
  exit 1
fi

if npm run build; then
  echo -e "\e[32mbuild successful\e[0m"
else
  echo -e "\e[31merror: build failed\e[0m"
  exit 1
fi

git rm index.js.map
echo "adding build files...";
if git add -f index.js; then
  echo -e "\e[32mgit added build files\e[0m"
else
  echo -e "\e[31merror: adding build files failed.\e[0m"
  echo -e "\e[31mDid the npm build succeed?\e[0m"
  echo -e "\e[31mIs the build file named index.js?\e[0m"
  exit 1
fi

echo "committing changes..."
git commit -m "add latest build";


echo "pushing changes..."
if git push -u origin gh-pages; then
  echo -e "\e[32msuccessfully pushed changes to gh-pages branch\e[0m"
else
  echo -e "\e[31merror: could not push changes\e[0m"
  exit 1
fi

git checkout develop;
echo -e "\e[42mSuccess!\e[0m"
exit 0
