#!/bin/sh
set -e

# DB müsait olana kadar bekle, sonra migrate et ve sunucuyu başlat
echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Starting Next.js server..."
exec node server.js
