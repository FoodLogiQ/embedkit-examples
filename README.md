# Boomi EmbedKit Examples

This project contains examples of Boomi EmbedKit configured across multiple front-ends and a simple Node.js server. Use these to see working integrations end to end. For details, see our [Product Documentation](https://developer.boomi.com/docs/BoomiEmbedded/BoomiEmbedded_overview).

### Project Contents

* server — simple Node.js server
* common-js — vanilla JS front-end
* react — React web front-end

## Prerequisites

The following are prerequisites to installing and configuring these demo environments.

### Access to EmbedKit Package

EmbedKit is a private npm package. You’ll need an auth token and an `.npmrc` in the root of the client you run so `@boomi/embedkit` can install.

Please contact Boomi Support or the EmbedKit Team for an npm access token if you do not have one.

### Boomi Account and Credentials

Please ensure your system has npm or yarn installed. You will also use environment variables to hold your Boomi credentials; have these ready:

```sh
API_ACCOUNT_ID="YOUR PRIMARY ACCOUNT ID WITHIN BOOMI"
API_USERNAME="A SERVICE ACCOUNT WITHIN BOOMI"
API_TOKEN="THE API TOKEN FOR THE SERVICE ACCOUNT"
API_AUTH_USER="THE SUB ACCOUNT ID WITHIN BOOMI"
API_ACCOUNT_GROUP="THE ACCOUNT GROUP HOLDING YOUR IPACKS"
```

### Add your local, dev, test, and production CORS configurations

The EmbedKit runs inside your app and makes client calls to the EmbedKit Server, so you must configure CORS for your tenant (parent account id):

1. Login to https://admin.boomi.space
2. Click the CORS tab in the left-hand menu.
3. Click “+” to add a configuration.
4. Add your origin and click save.
5. Verify the origin appears in your CORS configurations.

> [!NOTE]
> If you run into CORS issues, contact Boomi Support or the EmbedKit team.

## Server

From the repo root, change into `/server` and run:

### Install

```sh
npm i
```

### Environment Variables

Create `server/.env`:

```sh
## .env

# Server
PORT=8080
NODE_ENV=development

# Auth
JWT_SECRET=createAJWTSecret

# CORS
CORS_ORIGINS=http://localhost:5173

# Boomi 
EMBEDKIT_SERVER_BASE="https://api.boomi.space/api/v1"
API_URL="https://api.boomi.com/partner/api/rest/v1"
API_ACCOUNT_ID="***"
API_USERNAME="***"
API_TOKEN="***"
API_AUTH_USER="***"
API_ACCOUNT_GROUP="***"

# AI (optional)
OPENAI_API_KEY="***"
OPENAI_API_MODEL="gpt-4o-2024-08-06"
```

### Start the server

```sh
npm run dev
```

## Client

From the repo root, change into the client you want (`/common-js` or `/react`) and run:

### Install

Create an `.npmrc` in the client root with your token:

```sh
//registry.npmjs.org/:_authToken=npm_SOME_AUTH_TOKEN
```

Install dependencies:

```sh
npm i
```

### Environment Variables

Create `.env` in that client:

```sh
## .env

# Server (port must match the server configured above)
VITE_SERVER_URL="http://localhost:8080"
```

### Start the client

```sh
npm run dev
```

## Expected Behavior

The server and client should start without errors. If you see console errors, configuration is missing or incorrect.

Once both are running, navigate to http://localhost:5173:

1. You’ll be prompted to log in.
2. Enter any username/password (the demo server does NOT validate credentials; do not use this in production).
3. The client requests authentication from the server.
4. The server reads `.env` credentials and authenticates with the EmbedKit Server.
5. On success, the server returns a one-time HMAC nonce (2 min TTL).
6. The client initializes BoomiPlugin with the nonce, your tenantId (parentAccountId), and `boomi.config.js`.
7. The demo renders with EmbedKit initialized.

Sample `boomi.config.js` files are included. See the [Product Documentation](https://developer.boomi.com/docs/BoomiEmbedded/BoomiEmbedded_overview) to adjust configuration.

> [!IMPORTANT]
> You must create a CORS configuration in the EmbedKit administration app to enable your demo, test, or production instances. Follow the steps above to ensure it’s set up.
