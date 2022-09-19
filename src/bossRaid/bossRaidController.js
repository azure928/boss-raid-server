const bossRaidService = require('./bossRaidService');
const getStaticData = require('../../utils/getStaticData');

async function getStaticDataTest(req, res) {
  try {
    const staticData = await getStaticData();

    console.log('staticData', staticData);

    res.status(201).json(staticData);
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).send(
      { error: error.message } || {
        error: 'Internal Server Error',
      }
    );
  }
}

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

module.exports = { getStaticDataTest, readBossRaidStatus };
