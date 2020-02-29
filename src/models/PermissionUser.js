const { DataTypes } = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../configs/sequelize');

const User = require('./User');
const Permission = require('./Permission');

const schema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uuid()
  },
  permissionId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  // TODO: Add more field here
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

const PermissionUser = sequelize.define(
  'permission_user',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

PermissionUser.belongsTo(User, {
  foreignKey: 'userId'
});

PermissionUser.belongsTo(Permission, {
  foreignKey: 'permissionId'
});

module.exports = PermissionUser;