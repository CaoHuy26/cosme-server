const { DataTypes } = require('sequelize');
const uniquid = require('uniquid');
const sequelize = require('../configs/sequelize');

const Order = require('./Order');
const OrderStatus = require('./OrderStatus');

const schema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uniquid()
  },
  orderId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  orderStatusId: {
    type: DataTypes.UUID,
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

const OrderStatusHistory = sequelize.define(
  'order_status_history',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

OrderStatusHistory.belongsTo(Order, {
  foreignKey: 'orderId'
});

OrderStatusHistory.belongsTo(OrderStatus, {
  foreignKey: 'orderStatusId'
});

module.exports = OrderStatusHistory;