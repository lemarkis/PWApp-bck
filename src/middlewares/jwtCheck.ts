import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';
import authConfig from '../configs/auth.config.json';

const unlessOptions = {
  path: [
    '/',
    '/api/test/publicPing',
  ],
};

export default jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`,
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ['RS256'],
}).unless(unlessOptions);
