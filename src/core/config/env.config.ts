export const EnvConfiguration = () => ({
  port: process.env.PORT,
  environment: process.env.ENVIRONMENT,
  jwtSecret: `${process.env.JWT_SECRET}${!process.env.ENVIRONMENT || process.env.ENVIRONMENT === 'local' || process.env.ENVIRONMENT === 'dev-local' ? 'dev' : process.env.ENVIRONMENT}`,
});
