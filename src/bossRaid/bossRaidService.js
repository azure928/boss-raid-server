const bossRaidRepository = require('./bossRaidRepository');
const moment = require('moment');

// 보스레이드 상태 조회
async function readBossRaidStatus() {
  const bossRaidStatus = await bossRaidRepository.readBossRaidStatus();
  let canEnter;
  const enter_time = moment(bossRaidStatus[0].enter_time);

  //console.log('enter_time', enter_time);
  //console.log('bossRaidStatus!!', bossRaidStatus[0].status);

  if (
    bossRaidStatus[0].status == '성공' ||
    bossRaidStatus[0].status == '실패'
  ) {
    canEnter = true;
  }

  if (bossRaidStatus[0].status == '진행중') {
    const today = moment();
    //console.log('today', today);

    const timeDiff = moment.duration(today.diff(enter_time)).asMinutes();
    console.log('분 차이: ', timeDiff);

    if (timeDiff >= 3) {
      canEnter = true;
    }

    if (timeDiff < 3) {
      canEnter = false;
    }
  }

  const result = {
    canEnter: canEnter,
    enteredUserId: bossRaidStatus[0].user_id,
  };

  return result;
}

// 보스레이드 시작
async function createRaidHistory(userId, level) {
  let isEntered = false;

  let bossRaidStatus = await readBossRaidStatus();

  if (bossRaidStatus.canEnter === true) {
    // 게임 시작 가능
    const createdRaidHistory = await bossRaidRepository.createBossRaidHistory(
      userId,
      level
    );

    isEntered = true;
    const raidRecordId = createdRaidHistory.id;
    return { isEntered, raidRecordId };
  } else {
    // 게임 시작 불가능
    return { isEntered };
  }
}

module.exports = { readBossRaidStatus, createRaidHistory };
