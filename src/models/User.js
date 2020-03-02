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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  active: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
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

const User = sequelize.define(
  'user',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

// User.init(schema, {
//   sequelize,
//   tableName: 'user',
//   freezeTableName: true,
//   timestamps: false
// });

User.associations = (models) => {
  User.hasMany(models.ProductRating, {
    foreignKey: 'userId'
  });
  User.hasMany(models.ProductReview, {
    foreignKey: 'userId'
  });
  User.hasMany(models.Order, {
    foreignKey: 'userId'
  });
  User.hasMany(models.UserLog, {
    foreignKey: 'userId'
  });
  User.hasOne(models.UserProfile, {
    foreignKey: 'userId'
  });
  User.hasMany(models.UserPhoto, {
    foreignKey: 'userId'
  });
  User.hasMany(models.RoleUser, {
    foreignKey: 'userId'
  });
  User.hasMany(models.PermissionUser, {
    foreignKey: 'userId'
  });
};

module.exports = User;
