const userRepository = require('./userRepository');

// 유저 생성
async function createUser() {
  const createdUser = await userRepository.createUser();

  const createdUserId = {
    userId: createdUser.id,
  };
  return createdUserId;
}

module.exports = { createUser };
