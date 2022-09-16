const axios = require('axios');

const getStaticData = async () => {
  const { data } = await axios.get(
    'https://dmpilf5svl7rv.cloudfront.net/assignment/backend/bossRaidData.json'
  );

  return data.bossRaids[0];
};

module.exports = getStaticData;
