const userService = require('./userService');

// 유저 생성
async function createUser(req, res) {
  const createdUserId = await userService.createUser();
  res.status(201).json(createdUserId);
}

// 유저 조회
async function readUserRaidRecord(req, res) {
  const id = req.params.id;
  const result = await userService.readUserRaidRecord(id);
  res.status(200).json(result);
}

module.exports = { createUser, readUserRaidRecord };
