const db = require('../../database/models/index');
const Raid_record = db.raid_record;

/**
 * 기능: 보스레이드 상태 조회 (보스레이드 현재 상태 응답)
 */
async function readBossRaidStatus() {
  return await Raid_record.findAll({
    attributes: ['id', 'user_id', 'enter_time', 'status'],
    order: [['createdAt', 'DESC']],
    limit: 1,
  });
}

/**
 * 기능: 중복되지 않는 Raid_record id 생성
 */
async function createRaidRecord(userId, level) {
  return await Raid_record.create({
    user_id: userId,
    level: level,
    status: '진행중',
  });
}

/**
 * 기능: id로 Raid_record 읽어오기
 */
async function readRaidRecordById(raidRecordId) {
  return await Raid_record.findOne({
    where: {
      id: raidRecordId,
    },
  });
}

/**
 * 기능: Raid_record 테이블에서 end_time, status, score 컬럼 업데이트하기
 */
async function updateRaidRecord(raidRecordId, endTimeFormat, status, score) {
  return await Raid_record.update(
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
  createRaidRecord,
  readRaidRecordById,
  updateRaidRecord,
};
