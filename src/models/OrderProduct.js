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
  productId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING
  },
  sku: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.DECIMAL
  },
  priceWithTax: {
    type: DataTypes.DECIMAL
  },
  quantity: {
    type: DataTypes.INTEGER
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

const OrderProduct = sequelize.define(
  'order_product',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = OrderProduct;