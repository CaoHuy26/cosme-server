const { DataTypes } = require('sequelize');
const uniquid = require('uniquid');
const sequelize = require('../configs/sequelize');

const Manufacturer = require('./Manufacturer');

const schema = {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: () => uniquid()
  },
  manufacturerId: {
    type: DataTypes.UUID
  },
  brandName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  origin: {
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

const Brand = sequelize.define(
  'brand',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

Brand.associations = (models) => {
  Brand.hasMany(models.Product, {
    foreignKey: 'brandId'
  });
};

Brand.belongsTo(Manufacturer, {
  foreignKey: 'manufacturerId'
});

module.exports = Brand;