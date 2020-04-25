const { DataTypes } = require('sequelize');
const uniquid = require('uniquid');
const sequelize = require('../configs/sequelize');

const User = require('./User');

const schema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uniquid()
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: ''
  },
  // isAvatar: {
  //   type: DataTypes.BOOLEAN,
  //   allowNull: false,
  //   defaultValue: false
  // },
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