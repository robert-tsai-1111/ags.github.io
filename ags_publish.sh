source /Users/robert/app/ags-estate/env.sh

echo "Publish to ags.github.io..."
git add .
git commit -m "$(date +%Y%m%d)"
git push origin main

