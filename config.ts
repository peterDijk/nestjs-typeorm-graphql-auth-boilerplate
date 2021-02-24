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
    TITLE: process.env.APP_TITLE || 'NestJS Boilerplate',
    DESCRIPTION:
      process.env.APP_DESCRIPTION || 'NestJS Boilerplate description',
    // API
    PREFIX: process.env.APP_PREFIX || 'v1',
    VERSION: process.env.APP_VERSION || '1.0',
    API_EXPLORER_PATH: process.env.APP_API_EXPLORER_PATH || '/api',
    // Server
    HOST: process.env.APP_HOST || '0.0.0.0',
    PORT: process.env.PORT || 3000,
  },
  developtment: {},
  production: {
    PORT: process.env.PORT || 7000,
  },
};

const config = { ...configs.base, ...configs[env] };

export default config;
