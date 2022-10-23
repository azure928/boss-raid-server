const express = require('express');
const userRouter = require('./user/userRouter');
const bossRaidRouter = require('./bossRaid/bossRaidRouter');

const router = express.Router();

router.use(userRouter);
router.use(bossRaidRouter);

module.exports = router;
