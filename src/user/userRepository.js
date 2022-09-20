const db = require('../../database/models/index');
const User = db.user;
const Boss_raid_history = db.boss_raid_history;
const SQ = require('sequelize');
const Sequelize = SQ.Sequelize;
const sequelize = require('sequelize');
const Op = sequelize.Op;

// 유저 생성
const createUser = async () => {
  return await User.create({});
};

// 유저 조회 (유저의 보스레이드 총 점수와 참여기록 응답)
async function readUserRaidHistoryById(id) {
  return await User.findAll({
    attributes: [
      ['id', 'UserId'],
      ['total_score', 'totalScore'],
    ],
    include: [
      {
        model: Boss_raid_history,
        as: 'boss_raid_histories',
        attributes: [
          [Sequelize.col('id'), 'raidRecordId'],
          [Sequelize.col('score'), 'score'],
          [Sequelize.col('enter_time'), 'enterTime'],
          [Sequelize.col('end_time'), 'endTime'],
        ],
      },
    ],
    where: {
      id: id,
    },
  });
}

// 유저 조회
async function readUserById(id) {
  return await User.findOne({
    where: {
      id: id,
    },
  });
}

/**
 * 기능: user 테이블에서 total_score 컬럼 업데이트하기
 */
async function updateUserTotalscore(total_score, userId) {
  return await User.update(
    {
      total_score,
    },
    {
      where: {
        id: userId,
      },
    }
  );
}

module.exports = {
  createUser,
  readUserRaidHistoryById,
  readUserById,
  updateUserTotalscore,
};
