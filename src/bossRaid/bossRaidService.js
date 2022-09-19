const bossRaidRepository = require('./bossRaidRepository');

// 보스레이드 상태 조회
async function readBossRaidStatus() {
  const bossRaidStatus = await bossRaidRepository.readBossRaidStatus();
  let canEnter;
  let enteredUserId;

  //console.log('bossRaidStatus!!', bossRaidStatus[0].status);

  if (
    bossRaidStatus[0].status == '성공' ||
    bossRaidStatus[0].status == '실패'
  ) {
    (canEnter = true), (enteredUserId = bossRaidStatus[0].user_id);
  }

  if (bossRaidStatus[0].status == '진행중') {
    (canEnter = false), (enteredUserId = bossRaidStatus[0].user_id);
  }

  const result = {
    canEnter: canEnter,
    enteredUserId: enteredUserId,
  };

  return result;
}

module.exports = { readBossRaidStatus };
