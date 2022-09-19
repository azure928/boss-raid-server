const db = require('../../database/models/index');
const Boss_raid_history = db.boss_raid_history;

/**  보스레이드 상태 조회(보스레이드 현재 상태 응답) */
async function readBossRaidStatus() {
  return await Boss_raid_history.findAll({
    attributes: ['user_id', 'enter_time', 'status'],
    order: [['createdAt', 'DESC']],
    limit: 1,
  });
}

module.exports = { readBossRaidStatus };
