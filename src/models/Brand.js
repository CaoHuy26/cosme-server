const { DataTypes } = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../configs/sequelize');

const schema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    dafaultValue: () => uuid()
  },
  manufacturerId: {
    type: DataTypes.UUID
  },
  brandName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  origin: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    dafaultValue: () => new Date()
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: () => new Date()
  }
};

const Brand = sequelize.define(
  'brand',
  schema,
  {
    freezeTable: true,
    timestamps: false
  }
);

module.exports = Brand;