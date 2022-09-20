const express = require('express');
const bossRaidController = require('./bossRaidController');
const router = express.Router();

// 보스레이드 상태 조회
router.get('/bossraid', bossRaidController.readBossRaidStatus);

// 보스레이드 시작
router.post('/bossraid/enter', bossRaidController.startBossRaid);

// 보스레이드 종료
router.patch('/bossraid/end', bossRaidController.stopBossRaid);

module.exports = router;
