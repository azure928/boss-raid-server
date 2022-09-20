const { redisClient } = require('../database/config/redisClient');

// 캐시 체크를 위한 미들웨어
checkCache = (req, res, next) => {
  redisClient.get(req.url, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    // Redis에 저장된게 존재한다.
    if (data != null) {
      console.log('Redis에 저장된게 존재한다.');
      //console.log('typeof(data)', typeof data);
      const result = JSON.parse(data);
      res.send(result.bossRaids[0]);
    } else {
      // Redis에 저장된게 없기 때문에 다음 로직 실행
      console.log('Redis에 저장된게 없기 때문에 다음 로직 실행');
      next();
    }
  });
};

module.exports = { checkCache };
