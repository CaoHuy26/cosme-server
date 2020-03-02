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
  username: {
    type: DataTypes.STRING
  },
  phone: {
    type: DataTypes.STRING
  },
  dob: {
    type: DataTypes.DATE
  },
  country: {
    type: DataTypes.STRING
  },
  address: {
    type: DataTypes.STRING
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

const UserProfile = sequelize.define(
  'user_profile',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

UserProfile.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = UserProfile;