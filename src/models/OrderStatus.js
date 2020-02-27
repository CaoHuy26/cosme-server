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
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  statusName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  notification: {
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

const OrderStatus = sequelize.define(
  'order_status',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = OrderStatus;