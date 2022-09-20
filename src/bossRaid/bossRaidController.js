const bossRaidService = require('./bossRaidService');
const getStaticData = require('../../utils/getStaticData');

// 보스레이드 상태 조회
async function readBossRaidStatus(req, res) {
  try {
    const result = await bossRaidService.readBossRaidStatus();

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).send(
      { error: error.message } || {
        error: 'Internal Server Error',
      }
    );
  }
}

// 보스레이드 시작
async function createRaidHistory(req, res) {
  try {
    const { userId, level } = req.body;
    const createdRaidHistory = await bossRaidService.createRaidHistory(
      userId,
      level
    );

    if (createdRaidHistory.isEntered == true) {
      res.status(201).json(createdRaidHistory);
    } else {
      res.status(400).json(createdRaidHistory);
    }
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).send(
      { error: error.message } || {
        error: 'Internal Server Error',
      }
    );
  }
}

module.exports = { readBossRaidStatus, createRaidHistory };
