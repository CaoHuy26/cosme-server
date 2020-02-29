const { DataTypes } = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../configs/sequelize');

const schema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uuid()
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

const Permission = sequelize.define(
  'permission',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

Permission.associations = (models) => {
  Permission.hasMany(models.PermissionUser, {
    foreignKey: 'permissionId'
  }),
  Permission.hasMany(models.PermissionRole, {
    foreignKey: 'permissionId'
  })
};

module.exports = Permission;