const db = require('../../database/models/index');
const User = db.user;

// 유저 생성
const createUser = async () => {
  return await User.create({});
};

module.exports = { createUser };
