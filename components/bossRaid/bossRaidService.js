const bossRaidRepository = require('./bossRaidRepository');
const userRepository = require('../user/userRepository');
const MyRankingInfoDTO = require('./myRankingInfoDTO');
const moment = require('moment');
require('date-utils');
const { getStaticData } = require('../../utils/getStaticData');
const { setRankToRedis } = require('../../utils/setRankToRedis');

// 보스레이드 상태 조회
/*
async function readBossRaidStatus() {
  const bossRaidStatus = await bossRaidRepository.readBossRaidStatus();
  let canEnter;
  const enter_time = moment(bossRaidStatus[0].enter_time);
  //console.log('bossRaidStatus', bossRaidStatus);

  if (bossRaidStatus[0].status == '성공' || bossRaidStatus[0].status == '실패') {
    canEnter = true;
  }

  if (bossRaidStatus[0].status == '진행중') {
    const today = moment();

    const timeDiff = moment.duration(today.diff(enter_time)).asMinutes();
    let timeDiffSeconds = timeDiff * 60;
    console.log('timeDiff', timeDiff);
    console.log('timeDiffSeconds', timeDiffSeconds);

    // StaticData에서 보스레이드 정보 받아오기
    let { bossRaidLimitSeconds } = await getStaticData();

    if (timeDiffSeconds > bossRaidLimitSeconds) {
      console.log('진행중인 레이드 시간초과, 입장 가능');
      canEnter = true;
    }

    if (timeDiffSeconds <= bossRaidLimitSeconds) {
      console.log('아직 레이드 진행중');
      canEnter = false;
    }
  }

  const result = {
    canEnter: canEnter,
    enteredUserId: bossRaidStatus[0].user_id,
  };

  return result;
}*/

// 보스레이드 상태 조회
const readBossRaidStatus = async redis => {
  const bossRaidStatus = await redis.json.get('raidStatus');

  if (!bossRaidStatus) {
    const error = new Error();
    error.statusCode = 500;
    throw error;
  }

  return bossRaidStatus;
};

// 보스레이드 시작
async function startBossRaid(userId, level) {
  let isEntered = false;

  let bossRaidStatus = await readBossRaidStatus();

  if (bossRaidStatus.canEnter === true) {
    // 게임 시작 가능
    const createdRaidRecord = await bossRaidRepository.createRaidRecord(userId, level);

    isEntered = true;
    const raidRecordId = createdRaidRecord.id;
    return { isEntered, raidRecordId };
  } else {
    // 게임 시작 불가능
    return { isEntered };
  }
}

// 보스레이드 종료
async function stopBossRaid(userId, raidRecordId) {
  // 존재하는 user id 인지 확인
  const existedUser = await userRepository.readUserById(userId);
  if (existedUser) {
    let score;
    let status;

    let { total_score } = await userRepository.readUserById(userId);
    let { user_id, level, enter_time, end_time } = await bossRaidRepository.readRaidRecordById(
      raidRecordId
    );

    // StaticData에서 보스레이드 정보 받아오기
    let { bossRaidLimitSeconds, levels } = await getStaticData();

    // raidRecordId 가 진행한 게임 레벨에 해당하는 score를 찾아서 user의 total_score에 합산
    levels.forEach(info => {
      if (level === info.level) {
        score = info.score;
        total_score = total_score + score;
      }
    });

    // 1. 예외 처리 (입력된 user 아이디와 raid_record 의 user 아이디가 다른 경우)
    if (user_id !== Number(userId)) {
      const error = new Error('유저 아이디가 다릅니다.');
      error.statusCode = 403;
      throw error;
    }

    // 2. 예외처리 (기존 raid_record 에 end_time 값이 존재한다면
    // 이미 종료된 레이드이기 때문에 중복되지 않도록 처리)
    if (end_time) {
      const error = new Error('이미 종료 처리 된 레이드입니다.');
      error.statusCode = 400;
      throw error;
    }

    // 3. 예외 처리 (레이드 제한 시간 초과)
    let endTime = new Date();
    let endTimeFormat = endTime.toFormat('YYYY-MM-DD HH:MI:SS');

    if ((endTime.getTime() - new Date(enter_time).getTime()) / 1000 > bossRaidLimitSeconds) {
      // end_time, status 업데이트 (raid_record 테이블)
      status = '실패';
      score = 0;
      await bossRaidRepository.updateRaidRecord(raidRecordId, endTimeFormat, status, score);
      const error = new Error('레이드 실패! 레이드 제한 시간을 초과했습니다.');
      error.statusCode = 400;
      throw error;
    }

    // end_time, score, status 업데이트 (raid_record 테이블)
    status = '성공';
    await bossRaidRepository.updateRaidRecord(raidRecordId, endTimeFormat, status, score);
    // total_score 업데이트 (user 테이블)
    await userRepository.updateUserTotalscore(total_score, userId);

    // redis에 랭킹 업데이트
    await setRankToRedis();
  } else {
    // 존재하지 않는 user일 경우
    const error = new Error('존재하지 않는 유저 아이디입니다.');
    error.statusCode = 404;
    throw error;
  }
}

// 보스레이드 랭킹 조회
async function readBossRaidRank(userId) {
  // 존재하는 user id 인지 확인
  const existedUser = await userRepository.readUserById(userId);

  // 존재하는 user일 경우
  if (existedUser) {
    const rankingInfoData = await setRankToRedis();

    return rankingInfoData;
  } else {
    // 존재하지 않는 user일 경우
    const error = new Error('존재하지 않는 유저 아이디입니다.');
    error.statusCode = 404;
    throw error;
  }
}

async function readUserBossRaidRank(userId) {
  // 존재하는 user id 인지 확인
  const existedUser = await userRepository.readUserById(userId);

  // 존재하는 user일 경우
  if (existedUser) {
    let myRankingInfoData = [];

    // 내 랭킹 조회 (user id로)
    const myRankingInfoArr = await userRepository.readUserTotalScoreById(userId);

    myRankingInfoData.push(
      new MyRankingInfoDTO(
        myRankingInfoArr[0].ranking - 1,
        myRankingInfoArr[0].id,
        myRankingInfoArr[0].totalScore
      )
    );

    return myRankingInfoData;
  } else {
    // 존재하지 않는 user일 경우
    const error = new Error('존재하지 않는 유저 아이디입니다.');
    error.statusCode = 404;
    throw error;
  }
}

module.exports = {
  readBossRaidStatus,
  startBossRaid,
  stopBossRaid,
  readBossRaidRank,
  readUserBossRaidRank,
};
