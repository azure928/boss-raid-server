const Redis = require('redis');

module.exports = async (req, res, next) => {
  if (req.app.get('redis')) {
    return next();
  }

  const redisClient = Redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: process.env.REDIS_PASSWORD,
  });

  redisClient.on('connect', () => {
    console.info('Redis connected!');
    req.app.set('redis', redisClient);
    next();
  });

  redisClient.on('error', err => {
    console.error('Redis Client Error', err);
    req.app.set('redis', null);
    next(err);
  });

  await redisClient.connect();
};
