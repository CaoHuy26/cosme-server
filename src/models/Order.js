const { DataTypes } = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../configs/sequelize');

const OrderStatus = require('./OrderStatus');
const User = require('./User');

const schema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uuid()
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  orderStatusId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  receiverName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  receiverPhone: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shippingAddress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  shippingDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  comment: {
    type: DataTypes.STRING
  },
  totalDiscount: {
    type: DataTypes.DECIMAL
  },
  totalShipping: {
    type: DataTypes.DECIMAL
  },
  total: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  totalTax: {
    type: DataTypes.DECIMAL
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

const Order = sequelize.define(
  'order',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

Order.associations = (models) => {
  Order.hasMany(models.OrderProduct, {
    foreignKey: 'orderId'
  }),
  Order.hasMany(models.OrderStatusHistory, {
    foreignKey: 'orderId'
  })
};

Order.belongsTo(OrderStatus, {
  foreignKey: 'orderStatusId'
});

Order.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = Order;