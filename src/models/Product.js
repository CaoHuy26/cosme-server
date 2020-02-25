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
  categoryId: {
    type: DataTypes.UUID
  },
  brandId: {
    type: DataTypes.UUID
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.NUMBER,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
};

const Product = sequelize.define(
  'product',
  schema,
  {
    freezeTableName: true
  }
);

module.exports = Product;