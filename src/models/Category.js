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
  en_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  vn_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  imageUrl: {
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

const Category = sequelize.define(
  'category',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

// TODO: add sourceKey and targetKey
Category.associations = (models) => {
  Category.hasMany(models.Product, {
    foreignKey: 'categoryId'
  });
};

module.exports = Category;