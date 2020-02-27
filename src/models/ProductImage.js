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
  image: { // path
    tpye: DataTypes.STRING,
    allowNull: false
  },
  isThumbnail: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
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

const ProductImage = sequelize.define(
  'product_image',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = ProductImage;