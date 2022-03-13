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
    PORT: process.env.CONTAINER_PORT || 3000, // internal container port
    EXT_PORT: process.env.APP_PORT,
    // Database
    DB_SETTINGS: {
      hostname: process.env.DB_HOSTNAME,
      port: process.env.DB_PORT,
      credentials: {
        username: process.env.DB_CREDENTIALS_USERNAME,
        password: process.env.DB_CREDENTIALS_PASSWORD,
      },
      type: process.env.DB_TYPE,
      database: process.env.DB_DATABASE,
    },
    // App settings
    MIN_PW_LENGTH: 3,
  },
  developtment: {},
  production: {
    PORT: process.env.APP_PORT || 7000,
    MIN_PW_LENGTH: 8,
  },
};

const config = { ...configs.base, ...configs[env] };

export default config;
