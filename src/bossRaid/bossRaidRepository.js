const db = require('../../database/models/index');
const Boss_raid_history = db.boss_raid_history;

/**
 * 기능: 보스레이드 상태 조회(보스레이드 현재 상태 응답)
 */
async function readBossRaidStatus() {
  return await Boss_raid_history.findAll({
    attributes: ['user_id', 'enter_time', 'status'],
    order: [['createdAt', 'DESC']],
    limit: 1,
  });
}

/**
 * 기능: 중복되지 않는 boss_raid_history id 생성
 */
async function createBossRaidHistory(userId, level) {
  return await Boss_raid_history.create({
    user_id: userId,
    level: level,
    status: '진행중',
  });
}

/**
 * 기능: boss_raid_history 테이블에서 id로 level 찾기
 */
async function readRaidLevelById(raidRecordId) {
  return await Boss_raid_history.findOne({
    where: {
      id: raidRecordId,
    },
  });
}

/**
 * 기능: boss_raid_history 테이블에서 end_time, status, score 컬럼 업데이트하기
 */
async function updateRaidHistory(raidRecordId, endTimeFormat, status, score) {
  return await Boss_raid_history.update(
    {
      status: status,
      end_time: endTimeFormat,
      score: score,
    },
    {
      where: {
        id: raidRecordId,
      },
    }
  );
}

module.exports = {
  readBossRaidStatus,
  createBossRaidHistory,
  readRaidLevelById,
  updateRaidHistory,
};
