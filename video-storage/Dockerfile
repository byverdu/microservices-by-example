FROM node:20.6.0

WORKDIR /usr/src/app
COPY package.json ./

RUN npm install -g pnpm
RUN pnpm i --prod

COPY ./src ./src
COPY ./.env .

CMD pnpm run start