const { redisClient } = require('../database/config/redisClient');
const userRepository = require('../src/user/userRepository');
const RankingInfoDTO = require('../src/bossRaid/rankingInfoDTO');

async function setRankToRedis(req, res, next) {
  try {
    let rankingInfoData = [];
    let rankingInfoArr = [];

    // user 10명을 total_score 내림차순으로 조회
    rankingInfoArr = await userRepository.readUsersOrderByScore();

    for (let i = 0; i < rankingInfoArr.length; i++) {
      rankingInfoData.push(
        new RankingInfoDTO(i, rankingInfoArr[i].userId, rankingInfoArr[i].totalScore)
      );
    }

    // Redis에 rankingInfoData 캐싱
    console.log('Redis에 랭킹 정보 캐싱');
    await redisClient.json.set('rankingInfoData', '$', rankingInfoData);
    // 20분 후 만료 되도록 설정
    await redisClient.expire('rankingInfoData', 1200);

    return rankingInfoData;
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = { setRankToRedis };
