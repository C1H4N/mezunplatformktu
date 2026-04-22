# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
RUN apk add --no-cache openssl
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
# Build-time dummy URL — Prisma'nın module-level init'i için gerekli, gerçek bağlantı runtime'da geliyor
ENV DATABASE_URL=postgresql://dummy:dummy@localhost:5432/dummy
RUN npm run build
# Seed.ts'i JS'e derle (runner stage tsx gerektirmez)
RUN node_modules/.bin/tsc prisma/seed.ts \
    --module commonjs --target ES2017 --esModuleInterop \
    --resolveJsonModule --skipLibCheck --outDir /tmp/seed-out 2>/dev/null || true

# Stage 2: Run (Next.js standalone)
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl
ENV NODE_ENV=production

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

# Migration + seed için prisma ve ilgili dosyalar
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=build /app/node_modules/prisma ./node_modules/prisma
COPY --from=build /app/node_modules/bcryptjs ./node_modules/bcryptjs
COPY --from=build /app/app/generated ./app/generated
COPY --from=build /tmp/seed-out/prisma/seed.js ./seed.js
COPY MezunPlatform.UI/entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh

EXPOSE 3000
CMD ["sh", "entrypoint.sh"]
