const bossRaidService = require('./bossRaidService');
const { redisClient } = require('../../database/config/redisClient');

// 보스레이드 상태 조회
/*
async function readBossRaidStatus(req, res) {
  const bossRaidStatus = await bossRaidService.readBossRaidStatus();

  if (bossRaidStatus.canEnter === true) {
    res.status(200).json({
      canEnter: bossRaidStatus.canEnter,
    });
  } else {
    res.status(200).json(bossRaidStatus);
  }
}*/

// 보스레이드 상태 조회
const readBossRaidStatus = async (req, res) => {
  const redis = req.app.get('redis');
  const bossRaidStatus = await bossRaidService.readBossRaidStatus(redis);

  if (bossRaidStatus.canEnter === true) {
    res.status(200).json({
      canEnter: bossRaidStatus.canEnter,
    });
  } else {
    res.status(200).json(bossRaidStatus);
  }
};

// 보스레이드 시작
async function startBossRaid(req, res) {
  const redis = req.app.get('redis');
  const { userId, level } = req.body;
  const createdRaidRecord = await bossRaidService.startBossRaid(userId, level, redis);

  return res.status(201).json(createdRaidRecord);
}

// 보스레이드 종료
async function stopBossRaid(req, res) {
  const { userId, raidRecordId } = req.body;
  const result = await bossRaidService.stopBossRaid(userId, raidRecordId);

  return res.status(201).json({
    message: '보스레이드 성공',
  });
}

// 보스레이드 랭킹 조회
async function readBossRaidRank(req, res) {
  const { userId } = req.body;

  // redis에 랭킹 정보가 있나 확인
  let rankingInfoData = await redisClient.json.get('rankingInfoData');

  // Redis에 랭킹 정보가 없으면 DB에서 조회하여 Redis에 캐싱한다.
  if (!rankingInfoData) {
    console.log('Redis에 랭킹 정보가 없음');
    rankingInfoData = await bossRaidService.readBossRaidRank(userId);
  }

  // DB에서 유저 랭킹 조회
  const myRankingInfoData = await bossRaidService.readUserBossRaidRank(userId);

  const rankingResult = {
    topRankerInfoList: rankingInfoData,
    myRankingInfo: myRankingInfoData[0],
  };

  res.status(200).json(rankingResult);
}

module.exports = {
  readBossRaidStatus,
  startBossRaid,
  stopBossRaid,
  readBossRaidRank,
};
