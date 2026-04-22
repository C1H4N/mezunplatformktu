#!/bin/sh
set -e

echo "Syncing Prisma schema to DB..."
node node_modules/prisma/build/index.js db push --accept-data-loss

echo "Seeding database..."
node prisma/seed.js || echo "Seed skipped"

echo "Starting Next.js server..."
exec node server.js
