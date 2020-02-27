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
  user_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  status_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  receiver_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  receiver_phone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shipping_address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shipping_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING
  },
  total_discount: {
    type: DataTypes.DECIMAL
  },
  total_shipping: {
    type: DataTypes.DECIMAL
  },
  total: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  total_tax: {
    type: DataTypes.DECIMAL
  }
};

const Order = sequelize.define(
  'order',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = Order;