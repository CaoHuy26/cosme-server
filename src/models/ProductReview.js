const { DataTypes } = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../configs/sequelize');

const Product = require('./Product');
const User = require('./User');

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
  userId: {
    type: DataTypes.UUID,
    allowNull: false
  },
  review: {
    type: DataTypes.STRING,
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

const ProductReview = sequelize.define(
  'product_review',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

ProductReview.belongsTo(Product, {
  foreignKey: 'productId'
});

ProductReview.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = ProductReview;