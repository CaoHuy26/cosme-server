const { DataTypes } = require('sequelize');
const uniquid = require('uniquid');
const sequelize = require('../configs/sequelize');

const schema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uniquid()
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
    defaultValue: () => new Date()
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

OrderStatus.associations = (models) => {
  OrderStatus.hasMany(models.OrderStatusHistory, {
    foreignKey: 'orderStatusId'
  });
  OrderStatus.hasMany(models.Order, {
    foreignKey: 'orderStatusId'
  });
};

module.exports = OrderStatus;