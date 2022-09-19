const http = require('http');
const morgan = require('morgan');
const express = require('express');
const dotenv = require('dotenv');
const routes = require('./src/indexRouter');
const { sequelize } = require('./database/models/index');
const redis = require('redis');
const axios = require('axios');
const bodyParser = require('body-parser');

dotenv.config();

//* Redis 연결
// redis[s]://[[username][:password]@][host][:port][/db-number]
const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`,
  legacyMode: true, // 반드시 설정 !!
});
redisClient.on('connect', () => {
  console.info('Redis connected!');
});
redisClient.on('error', err => {
  console.error('Redis Client Error', err);
});
redisClient.connect().then(); // redis v4 연결 (비동기)
const redisCli = redisClient.v4; // 기본 redisClient 객체는 콜백기반인데 v4버젼은 프로미스 기반이라 사용

//* DB 연결
sequelize
  .sync({ force: false }) // true 로 설정하면 서버 실행마다 테이블 재생성
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch(err => {
    console.error(err);
  });

const app = express();

// Body Parser 미들웨어
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);

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
      res.send(data);
    } else {
      // Redis에 저장된게 없기 때문에 다음 로직 실행
      console.log('Redis에 저장된게 없기 때문에 다음 로직 실행');
      next();
    }
  });
};

//  [GET] /staticdata
//  미들웨어 추가
app.get('/staticdata', checkCache, async (req, res) => {
  try {
    console.log(req.url);
    const staticDataInfo = await axios.get(
      'https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json'
    );

    // response에서 data 가져오기
    const staticData = staticDataInfo.data;
    await redisClient.setex(req.url, 1440, JSON.stringify(staticData));

    return res.json(staticData);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

const server = http.createServer(app);
const PORT = process.env.PORT || 10010;

server.listen(PORT, () => {
  console.log(`server start PORT:${PORT}`);
});
