const app = require('./app');
const PORT = process.env.PORT || 10010;
//const logger = require('./logger');

app.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}/`);
  //logger.info(`server start : http://localhost:${PORT}/`);
});
