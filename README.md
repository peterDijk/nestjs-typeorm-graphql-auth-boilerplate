## NestJS TypeORM GraphQL Auth Boilerplate

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

create .env file with this content

```bash
DIR_DATA_PATH="$PWD"
DB_TYPE=postgres
DB_CREDENTIALS_USERNAME=development
DB_CREDENTIALS_PASSWORD=development
DB_DATABASE=nestjs-boilerplate
DB_PORT=3306
DB_HOSTNAME=nestjs-boiler-db
CONTAINER_COMMAND="npm run start"
CONTAINER_SCALE="1"
CONTAINER_PORT=3000
APP_HOST=localhost
APP_PORT=8080
GQL_PLAYGROUND=enabled
JWT_SECRET=secret
EXPIRES_IN=1d
```

## Set up local database

```bash
$ docker-compose up -d
$ npm run migration:run

# after adding model(s) or make changes to models, generate new migration:
$ npm run migration:generate -- [migration-name]
```

## Running the app

```bash
# development
$ npm start

# production mode
$ NODE_ENV=production npm run start:prod
```

## GraphQL

for explorer:

- go to [app-url]/graphql
- register, login, copy token from response
- set Http Headers:

```
{
    "Authorization": "Bearer [token]"
}
```

- you now have access to protected queries/ mutations

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Notes

A nice and clean Postgres client app I like is Postico
https://eggerapps.at/postico/

- GET /health as first test route, and POST as test to store record in database
- Now as RESTful API only. With Nestjs application is setup modules and services. Graphql can be added (@nestjs/graphql) the resolver can use the same services. So easy to plugin graphql now

### TODO

:check: Add Authentification layer. On succesful login a JWT token is returned. In all following requests add the token to the header. Authentification decorator will be added to routes/ resolvers wich will make these endpoints protected

- Add Graphql layer
- all setup now and ready for adding logic for the Byndies Sharing app

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backer. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
