# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
RUN apk add --no-cache openssl
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
# Build-time dummy URL — Prisma'nın module-level init'i için gerekli
ENV DATABASE_URL=postgresql://dummy:dummy@localhost:5432/dummy
RUN npm run build

# Stage 2: Run (Next.js standalone)
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl
ENV NODE_ENV=production

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

# Prisma + seed için gerekli modüller
COPY --from=build /app/prisma ./prisma
COPY --from=build /app/app/generated ./app/generated
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma
COPY --from=build /app/node_modules/@prisma ./node_modules/@prisma
COPY --from=build /app/node_modules/prisma ./node_modules/prisma
COPY --from=build /app/node_modules/bcryptjs ./node_modules/bcryptjs

COPY MezunPlatform.UI/entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh

EXPOSE 3000
CMD ["sh", "entrypoint.sh"]
