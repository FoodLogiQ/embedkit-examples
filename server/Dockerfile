FROM node:22-alpine
WORKDIR /usr/src/app

ENV NODE_ENV=production
# Prisma generate needs a datasource URL; runtime uses the App Runner / Secrets Manager value.
ENV DATABASE_URL="sqlserver://127.0.0.1:1433;database=build;user=build;password=build;encrypt=true;trustServerCertificate=true"

# RDS presents an Amazon RDS CA cert, which is absent from the default trust store.
# Appending the bundle keeps DB TLS verified without trustServerCertificate, and
# leaves the public CAs intact for outbound Boomi/EmbedKit HTTPS calls.
ADD https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem /etc/ssl/certs/rds-global-bundle.pem
RUN chmod 0644 /etc/ssl/certs/rds-global-bundle.pem
ENV NODE_EXTRA_CA_CERTS=/etc/ssl/certs/rds-global-bundle.pem

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
