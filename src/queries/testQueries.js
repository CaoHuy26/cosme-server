const { Op } = require('sequelize');

const Product = require('../models/Product');
const Category = require('../models/Category');

const Brand = require('../models/Brand');
const Manufacturer = require('../models/Manufacturer');

const getData = async () => {
  const res = await Product.findAll({
    raw: true,
    attributes: ['name', 'price', 'stock', 'category.en_name', 'category.imageUrl'], // custom data receive here
    include: [{
      model: Category,
      required: true, // INNER JOIN
      where: {
        en_name: 'lipstick'
      }
    }]
  });

  console.log(res)
}

const innerJoin = async () => {
  const res = await Product.findAll({
    raw: true,
    attributes: ['name', 'brand.brandName'],
    include: [{
      model: Brand,
      required: true,
      where: {
        brandName: 'Samsung galaxy S10'
      }
    }]
  });

  console.log(res)
};

/**
 * SELECT product.name
 * FORM product
 * INNER JOIN brand
 * ON product.brandId = brand.id
 * INNER JOIN manufacturer
 * ON brand.manufacturerId = manufacturer.id
 * WHERE manufacturer.name = 'Samsung';
 */
const multiInnerJoin = async () => {
  const res = await Product.findAll({
    raw: true,
    attributes: ['product.name'],
    include: [{
      model: Brand,
      required: true,
      include: [{
        model: Manufacturer,
        required: true,
        where: {
          name: 'Samsung'
        }
      }]
    }]
  });

  console.log(res)
}


multiInnerJoin()