const bossRaidService = require('./bossRaidService');

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
async function startBossRaid(req, res) {
  try {
    const { userId, level } = req.body;
    const createdRaidHistory = await bossRaidService.startBossRaid(
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

// 보스레이드 종료
async function stopBossRaid(req, res) {
  try {
    const { userId, raidRecordId } = req.body;
    const result = await bossRaidService.stopBossRaid(userId, raidRecordId);

    return res.status(201).json({ message: '보스레이드 성공' });
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).send(
      { error: error.message } || {
        error: 'Internal Server Error',
      }
    );
  }
}

// 보스레이드 랭킹 조회
async function readBossRaidRank(req, res) {
  try {
    const { userId } = req.body;
    const result = await bossRaidService.readBossRaidRank(userId);

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

module.exports = {
  readBossRaidStatus,
  startBossRaid,
  stopBossRaid,
  readBossRaidRank,
};
