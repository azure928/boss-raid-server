const express = require('express');
const bossRaidController = require('./bossRaidController');
const router = express.Router();
const { checkCache } = require('../../middleware/checkCache');
const { getStaticData } = require('../../utils/getStaticData');

// staticdata 조회
router.get('/staticdata', checkCache, getStaticData);

// 보스레이드 상태 조회
router.get('/bossraid', bossRaidController.readBossRaidStatus);

// 보스레이드 시작
router.post('/bossraid/enter', bossRaidController.createRaidHistory);

module.exports = router;
