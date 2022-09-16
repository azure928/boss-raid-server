const express = require('express');
const bossRaidController = require('./bossRaidController');
const router = express.Router();

router.get('/bossraid/staticdata', bossRaidController.getStaticDataTest);

module.exports = router;
