#!/bin/sh
set -e

echo "Syncing Prisma schema to DB..."
node node_modules/prisma/build/index.js db push --accept-data-loss

echo "Seeding database..."
node seed.js || echo "Seed skipped (already done or failed)"

echo "Starting Next.js server..."
exec node server.js
