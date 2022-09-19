const db = require('../../database/models/index');
const Boss_raid_history = db.boss_raid_history;
const SQ = require('sequelize');
const Sequelize = SQ.Sequelize;
const sequelize = require('sequelize');
const Op = sequelize.Op;

/**  보스레이드 상태 조회  */
async function readBossRaidStatus() {
  return await Boss_raid_history.findAll({
    attributes: ['user_id', 'enter_time', 'end_time', 'status'],
    order: [['createdAt', 'DESC']],
    limit: 1,
  });
}

module.exports = { readBossRaidStatus };
