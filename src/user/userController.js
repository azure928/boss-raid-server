const userService = require('./userService');

// 유저 생성
async function createUser(req, res) {
  try {
    const createdUserId = await userService.createUser();
    res.status(201).json(createdUserId);
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).send(
      { error: error.message } || {
        error: 'Internal Server Error',
      }
    );
  }
}

module.exports = { createUser };
