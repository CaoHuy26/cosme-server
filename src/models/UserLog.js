const { DataTypes } = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../configs/sequelize');

const User = require('./User');

const schema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uuid()
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  ipAddress: {
    type: DataTypes.STRING
  },
  deviceId: {
    type: DataTypes.STRING
  },
  action: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  activedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: () => new Date()
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: () => new Date()
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: () => new Date()
  }
};

const UserLog = sequelize.define(
  'user_log',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

UserLog.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = UserLog;