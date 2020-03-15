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
  image: {
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

const UserPhoto = sequelize.define(
  'user_photo',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

UserPhoto.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = UserPhoto;