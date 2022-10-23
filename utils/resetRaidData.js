module.exports = async redis => {
  await redis.json.set('raidStatus', '$', {
    canEnter: true,
    enteredUserId: null,
  });
  await redis.json.set('enteredRaidInfo', '$', {});
};
