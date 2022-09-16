var DataTypes = require('sequelize').DataTypes;
var _boss_raid_history = require('./boss_raid_history');
var _user = require('./user');

function initModels(sequelize) {
  var boss_raid_history = _boss_raid_history(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  boss_raid_history.belongsTo(user, { as: 'user', foreignKey: 'user_id' });
  user.hasMany(boss_raid_history, {
    as: 'boss_raid_histories',
    foreignKey: 'user_id',
  });

  return {
    boss_raid_history,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
