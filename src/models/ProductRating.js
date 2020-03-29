const { DataTypes } = require('sequelize');
const uniquid = require('uniquid');
const sequelize = require('../configs/sequelize');

const Product = require('./Product');
const User = require('./User');

const schema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uniquid()
  },
  productId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  rate: {
    type: DataTypes.INTEGER,
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

const ProductRating = sequelize.define(
  'product_rating',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

ProductRating.belongsTo(Product, {
  foreignKey: 'productId'
});

ProductRating.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = ProductRating;