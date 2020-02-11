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
  username: {
    type: DataTypes.STRING
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
  }
};

const User = sequelize.define(
  'user',
  schema,
  {
    freezeTableName: true,
  }
);

// User.init(schema, {
//   sequelize,
//   tableName: 'user',
//   freezeTableName: true,
//   timestamps: false
// });

module.exports = User;
