const axios = require('axios');
const { redisClient } = require('../database/config/redisClient');

/*
const getStaticData = async () => {
  const { data } = await axios.get(
    'https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json'
  );

  return data.bossRaids[0];
};*/

async function getStaticData(req, res) {
  try {
    console.log(req.url);
    const staticDataInfo = await axios.get(
      'https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json'
    );

    // response에서 data 가져오기
    const staticData = staticDataInfo.data;
    await redisClient.setex(req.url, 1440, JSON.stringify(staticData));

    return res.json(staticData.bossRaids[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

module.exports = { getStaticData };
