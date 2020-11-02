set -e

./pnpm install
./pnpm run build

if [ ! -z "$DEPLOY_TAG" ]; then
  ./pnpm run deploy-assets
fi
