# Hello, World!

This is a test task for company Digital Outside for Junior Backend Developer position.

# Installation

## Requirements

- NodeJS v18.7.0 (i haven't tested it with other versions)
- Yarn/NPM (i used Yarn; PNPM doesn't work!)
- Docker Compose or PostgreSQL

## Setup

```sh
# installing dependencies
yarn
# or with npm
npm install

# setup database with Docker (you can skip this step if you're already installed PostgreSQL)
docker compose up -d

# add database url to .env file, in case of Docker paste following string:
# DATABASE_URL="postgresql://root:root@127.0.0.1:5432/outside_digital"

# generating prisma and apply migrations
yarn prisma generate
yarn prisma migrate reset
# or with npx
npx prisma generate
npx prisma migrate reset

# production build
yarn build
yarn start:prod
# or in dev mode
yarn start:dev

# or production build with npx
npx build
npx start:prod
# or in dev mode with npm
npm run start:dev
```

# Endpoints Documentation

At /api endpoint of running application.

# Developer Comment (RU)

Docker Compose тут чисто ради БД.
Я мог бы написать и dockerfile, но, честно говоря, не было желания.
Тесты дефолтные, от Nest CLI, т. е. толку от них нет.

# License

Here are no license, do with this code whatever you want, i don't care
