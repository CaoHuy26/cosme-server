const { DataTypes } = require('sequelize');
const uuid = require('uuid/v4');
const sequelize = require('../configs/sequelize');

const Category = require('./Category');
const Brand = require('./Brand');

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
  sku: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.DECIMAL,
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

const Product = sequelize.define(
  'product',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

Product.associations = (models) => {
  Product.hasMany(models.ProductImage, {
    foreignKey: 'productId'
  });
  Product.hasMany(models.ProductReview, {
    foreignKey: 'productId'
  });
  Product.hasMany(models.ProductRating, {
    foreignKey: 'productId'
  });
  Product.hasMany(models.OrderProduct, {
    foreignKey: 'productId'
  });
};

Product.belongsTo(Category, {
  foreignKey: 'categoryId'
});

Product.belongsTo(Brand, {
  foreignKey: 'brandId'
});

module.exports = Product;