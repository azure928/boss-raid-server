const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    'raid_record',
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      score: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      enter_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      level: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: 'raid_record',
      timestamps: true,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [{ name: 'id' }],
        },
        {
          name: 'user_id',
          using: 'BTREE',
          fields: [{ name: 'user_id' }],
        },
      ],
    }
  );
};
