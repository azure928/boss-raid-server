const http = require('http');
const morgan = require('morgan');
const express = require('express');
const dotenv = require('dotenv');
const routes = require('./src/indexRouter');
const { sequelize } = require('./database/models/index');

dotenv.config();

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

app.use(morgan('dev'));
app.use(express.json());
app.use(routes);

const server = http.createServer(app);
const PORT = process.env.PORT || 10010;

server.listen(PORT, () => {
  console.log(`server start PORT:${PORT}`);
});
