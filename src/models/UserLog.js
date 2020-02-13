const { DataTypes } = require('sequelize');
const uniquid = require('uniquid');
const sequelize = require('../configs/sequelize');

const schema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uniquid('log-')
  }
};

const UserLog = sequelize.define(
  'user_log',
  schema,
  {
    freezeTableName: true
  }
);

module.exports = UserLog;