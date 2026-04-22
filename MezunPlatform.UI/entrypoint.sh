#!/bin/sh
set -e

echo "Syncing Prisma schema to DB..."
node node_modules/prisma/build/index.js db push --accept-data-loss

echo "Seeding database..."
node node_modules/tsx/dist/cli.mjs prisma/seed.ts || echo "Seed skipped"

echo "Starting Next.js server..."
exec node server.js
