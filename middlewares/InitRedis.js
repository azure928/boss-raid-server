const Redis = require('redis');

const InitRedis = async (req, res, next) => {
  if (req.app.get('redis')) {
    return next();
  }

  const redisClient = Redis.createClient({
    url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
    legacyMode: true,
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

  await redisClient.connect(); // redis v4 연결 (비동기)
};

module.exports = InitRedis;
