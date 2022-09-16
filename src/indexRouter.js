const express = require('express');
const userRouter = require('./user/userRouter');

const router = express.Router();

// test
router.get('/ping', (req, res) => {
  res.json({ message: 'pong' });
});

router.use(userRouter);

module.exports = router;
