const { DataTypes } = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../configs/sequelize');

const User = require('./User');
const Role = require('./Role');

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
  userId: {
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

const RoleUser = sequelize.define(
  'role_user',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

RoleUser.belongsTo(User, {
  foreignKey: 'userId'
});

RoleUser.belongsTo(Role, {
  foreignKey: 'roleId'
});

module.exports = RoleUser;