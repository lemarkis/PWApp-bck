
module.exports = {
  publicPing,
  privatePing,
}

async function publicPing(req, res, next) {
  console.log(req.baseUrl);
  res.send('public pong');
}

async function privatePing(req, res, next) {
  console.log(req.baseUrl);
  res.send('private pong');
}