const express = require('express');
const userController = require('./userController');
const router = express.Router();

// 유저 생성
router.post('/users', userController.createUser);

module.exports = router;
