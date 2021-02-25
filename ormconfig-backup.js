/* eslint-disable */
// const CustomNamingStrategy = require('./src/__init__/db').CustomNamingStrategy;
var config = require('./config.ts');

module.exports = {
  type: config.DB_TYPE,
  url:
    config.DB_URL ||
    `postgres://${config.DB_USER}:${config.DB_PASSWORD}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_DATABASE}`,
  migrationsTableName: 'migration',
  entities: ['dist/**/*.model.js'],
  migrations: ['dist/src/database/migrations/*.js'],
  // namingStrategy: new CustomNamingStrategy(),
  synchronize: false,
  logging: true,
  cli: {
    migrationsDir: 'src/migration',
  },
};
