const express = require('express');
const bossRaidController = require('./bossRaidController');
const router = express.Router();

router.get('/bossraid/staticdata', bossRaidController.getStaticDataTest);

// 보스레이드 상태 조회
router.get('/bossraid', bossRaidController.readBossRaidStatus);

module.exports = router;
