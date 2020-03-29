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
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: () => new Date()
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: () => new Date()
  }
};

const Manufacturer = sequelize.define(
  'manufacturer',
  schema,
  {
    freezeTableName: true,
    timestamps: false
  }
);

// hasMany called with something that's not an instance of Sequelize.Model
Manufacturer.associations = (models) => {
  Manufacturer.hasMany(models.Brand, {
    foreignKey: 'manufacturerId'
  });
};

module.exports = Manufacturer;