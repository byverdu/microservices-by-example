FROM node:20-slim AS base

WORKDIR /usr/src/app

ARG NODE_ENV
ENV NODE_ENV=$NODE_ENV
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

COPY pnpm-lock.yaml ./
COPY package.json ./
COPY .env ./

RUN pnpm fetch

FROM base AS dev
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --offline

FROM dev AS prod
WORKDIR /usr/src/app
COPY --from=dev  /usr/src/app/node_modules/ ./node_modules
COPY ./src ./src

CMD [ "npm", "start" ]