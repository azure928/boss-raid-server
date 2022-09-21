var DataTypes = require('sequelize').DataTypes;
var _raid_record = require('./raid_record');
var _user = require('./user');

function initModels(sequelize) {
  var raid_record = _raid_record(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  raid_record.belongsTo(user, { as: 'user', foreignKey: 'user_id' });
  user.hasMany(raid_record, { as: 'raid_records', foreignKey: 'user_id' });

  return {
    raid_record,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
