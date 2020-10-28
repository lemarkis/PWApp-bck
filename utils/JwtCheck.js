const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const authConfig = require('../auth_config.json');

const publicRoutes = {
  path: [
    "/",
    "/api/test/publicPing"
  ]
}

module.exports = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authConfig.domain}/.well-known/jwks.json`
  }),
  audience: authConfig.audience,
  issuer: `https://${authConfig.domain}/`,
  algorithms: ['RS256']
}).unless(publicRoutes);