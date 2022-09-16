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
async function readUserRaidHistoryById(id) {
  const existedUser = await userRepository.readUserById(id);
  console.log('existedUser', existedUser);

  if (existedUser) {
    const selectedUserInfo = await userRepository.readUserRaidHistoryById(id);

    if (selectedUserInfo.length == 0) {
      const error = new Error();
      error.statusCode = 204;
      throw error;
    } else {
      return selectedUserInfo[0];
    }
  } else {
    const error = new Error('존재하지 않는 유저 아이디입니다.');
    error.statusCode = 404;
    throw error;
  }
}

module.exports = { createUser, readUserRaidHistoryById };
