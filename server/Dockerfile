FROM node:22-alpine
WORKDIR /usr/src/app

ENV NODE_ENV=production
# Prisma generate needs a datasource URL; runtime uses the App Runner / Secrets Manager value.
ENV DATABASE_URL="sqlserver://127.0.0.1:1433;database=build;user=build;password=build;encrypt=true;trustServerCertificate=true"

COPY package*.json ./
COPY prisma ./prisma/
COPY prisma.config.ts ./

# prisma CLI is a devDependency: install all, generate client, then drop dev deps
RUN npm ci \
  && npx prisma generate \
  && npm prune --omit=dev

COPY . .

EXPOSE 8080
CMD ["npm", "start"]
