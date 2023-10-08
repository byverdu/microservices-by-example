FROM node:20.6.0 as builder

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./
COPY src ./src
COPY .env ./

RUN npm install -g pnpm
RUN pnpm install

# The instructions for second stage
FROM node:20.6.0-slim

WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/ .

CMD ls -a node_modules && npm run start
