//const bossRaidService = require('./bossRaidService');
const getStaticData = require('../../utils/getStaticData');

async function getStaticDataTest(req, res) {
  try {
    const staticData = await getStaticData();

    console.log('staticData', staticData);

    res.status(201).json(staticData);
  } catch (error) {
    console.log(error);
    return res.status(error.statusCode || 500).send(
      { error: error.message } || {
        error: 'Internal Server Error',
      }
    );
  }
}

module.exports = { getStaticDataTest };
