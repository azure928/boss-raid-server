const userRepository = require('./userRepository');

// 유저 생성
async function createUser() {
  const createdUser = await userRepository.createUser();

  const createdUserId = {
    userId: createdUser.id,
  };
  return createdUserId;
}

// 유저 조회
async function readUserRaidRecord(id) {
  // 존재하는 유저인지 확인
  const existedUser = await userRepository.readUserById(id);

  if (existedUser) {
    const selectedUserInfo = await userRepository.readUserRaidRecordById(id);

    if (selectedUserInfo.length == 0) {
      const error = new Error();
      error.statusCode = 204;
      throw error;
    } else {
      let result = {
        totalScore: selectedUserInfo[0].dataValues.totalScore,
        bossRaidHistory: selectedUserInfo[0].dataValues.raid_records,
      };
      return result;
    }
  } else {
    const error = new Error('존재하지 않는 유저 아이디입니다.');
    error.statusCode = 404;
    throw error;
  }
}

module.exports = { createUser, readUserRaidRecord };
