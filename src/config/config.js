import Joi from 'joi';

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(1440).description('minutes after which access tokens expire'),
    DB_USERNAME: Joi.string().required().description('database user'),
    DB_PASSWORD: Joi.string().required().description('database password'),
    DB_DATABASE: Joi.string().required().description('database name'),
    DB_HOST: Joi.string().required().description('database host'),
    DB_DIALECT: Joi.string().valid('mysql').required().description('database dialect'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export default {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  database: {
    username: envVars.DB_USERNAME,
    password: envVars.DB_PASSWORD,
    database: envVars.DB_DATABASE,
    host: envVars.DB_HOST,
    dialect: envVars.DB_DIALECT,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
  },
};
