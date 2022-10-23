const app = require('./app');
const PORT = process.env.PORT || 10010;

app.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}/`);
});
