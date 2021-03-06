const { DataTypes } = require('sequelize');
const uniquid = require('uniquid');
const sequelize = require('../configs/sequelize');

const schema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uniquid()
  },
  name: {
    type: DataTypes.STRING,
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

const Role = sequelize.define(
  'role',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

Role.associations = (models) => {
  Role.hasMany(models.RoleUser, {
    foreignKey: 'roleId'
  });
  Role.hasMany(models.PermissionRole, {
    foreignKey: 'roleId'
  });
};

module.exports = Role;