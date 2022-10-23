module.exports = async (req, res, next) => {
  try {
    const redis = req.app.get('redis');

    if (!(await redis.json.get('enteredRaidInfo'))) {
      await redis.json.set('enteredRaidInfo', '$', {});
    }

    if (!(await redis.json.get('raidStatus'))) {
      await redis.json.set('raidStatus', '$', {
        canEnter: true,
        enteredUserId: null,
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};
