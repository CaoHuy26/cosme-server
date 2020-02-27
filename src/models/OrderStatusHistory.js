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
  order_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  order_status_id: {
    type: DataTypes.UUID,
    allowNull: false
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

const OrderStatusHistory = sequelize.define(
  'order_status_history',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = OrderStatusHistory;