const { DataTypes } = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../configs/sequelize');

const Role = require('./Role');
const Permission = require('./Permission');

const schema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uuid()
  },
  roleId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  permissionId: {
    type: DataTypes.UUID,
    allowNull: false
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

const PermissionRole = sequelize.define(
  'permission_role',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

PermissionRole.belongsTo(Role, {
  foreignKey: 'roleId'
});

PermissionRole.belongsTo(Permission, {
  foreignKey: 'permissionId'
});

module.exports = PermissionRole;