const axios = require('axios');
const { redisClient } = require('../database/config/redisClient');
require('dotenv').config();

async function setStaticData(req, res, next) {
  try {
    const staticdata = await redisClient.json.get('staticdata');
    //console.log('staticdata??', staticdata);

    if (staticdata) {
      console.log('Redis에 저장된 staticdata가 존재한다.');
      return staticdata;
    } else {
      console.log('Redis에 저장된 staticdata가 존재하지 않는다.');
      const response = await axios.get(process.env.STATIC_DATA_URL);

      const staticdata = response.data.bossRaids[0];
      //console.log('staticdata!!', staticdata);

      await redisClient.json.set('staticdata', '$', staticdata);
      // 6시간 후 만료 되도록 설정
      await redisClient.expire('staticdata', 21600);
      return staticdata;
    }
  } catch (error) {
    console.error(error);
    return error;
  }
}

module.exports = { setStaticData };
