import * as dotenv from 'dotenv';
import * as pkg from './package.json';

dotenv.config();

const envDevelopmentName = 'development';
const env = process.env.NODE_ENV || envDevelopmentName;
const configs = {
  base: {
    ENV: env,
    DEV: env === envDevelopmentName,
    // General
    NAME: process.env.APP_NAME || pkg.name,
    TITLE: process.env.APP_TITLE || pkg.title || 'NestJS Boilerplate',
    DESCRIPTION:
      process.env.APP_DESCRIPTION ||
      pkg.description ||
      'NestJS Boilerplate description',
    // API
    PREFIX: process.env.APP_PREFIX || 'v1',
    VERSION: process.env.APP_VERSION || '0.0.1',
    API_EXPLORER_PATH: process.env.APP_API_EXPLORER_PATH || '/api-explorer',
    // Server
    HOST: process.env.APP_HOST || '0.0.0.0',
    PORT: process.env.PORT || 3000,
    // Database
    DB_TYPE: 'postgres',
    DB_HOST: '0.0.0.0',
    DB_PORT: '5430',
    DB_USER: 'development',
    DB_PASSWORD: 'development',
    DB_DATABASE: 'postgres',
  },
  developtment: {},
  production: {
    PORT: process.env.PORT || 7000,
  },
};

const config = { ...configs.base, ...configs[env] };

config.getTypeOrmConfig = () => ({
  type: config.DB_TYPE,
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_DATABASE,

  entities: ['**/*.entity{.ts,.js}'],

  migrationsTableName: 'migration',

  migrations: ['src/migration/*.ts'],

  cli: {
    migrationsDir: 'src/migration',
  },
});

export default config;
