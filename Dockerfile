FROM node:14-alpine as builder

WORKDIR /app

COPY . /app

RUN yarn install --prod

RUN yarn add typescript

RUN yarn tsc -p tsconfig-build.json

RUN yarn remove typescript

ENV PORT=80

RUN yarn prisma generate

ENTRYPOINT ["yarn", "start"]
