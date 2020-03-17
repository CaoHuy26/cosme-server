const { Op } = require('sequelize');
const Product = require('../models/Product');
const Category = require('../models/Category');
const User = require('../models/User')

const Brand = require('../models/Brand');
const Manufacturer = require('../models/Manufacturer');

const Order = require('../models/Order')
const OrderProduct = require('../models/OrderProduct');

const getProduct = async () => {
  const res = await OrderProduct.findAll({
    raw: true,
    attributes: ['price', 'quantity'],
    include: [
      {
        model: Product,
        attributes: ['name'],
        required: true
      },
      {
        model: Order,
        attributes: ['receiverName', 'receiverPhone', 'shippingAddress', 'shippingDate', 'total'],
        required: true,
        include: [{
          model: User,
          attributes: ['email'],
          required: true
        }],
        where: {
          id: '4238b778-3df7-456b-96f3-86d69e08ef36'
        }
      }
    ]
  });

  console.log(res);
}

getProduct();

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

const axios = require('axios')

const api = async () => {
  const res = await axios.get('https://makeup-api.herokuapp.com/api/v1/products.json?product_type=blush');
  const { data } = res;
  data.map(product => {
    const { brand, name, price } = product;
    console.log(brand, name, price)
  })
}

// api()

const searchProducts = async (params) => {
  const {
    limit,
    offset,
    categoryId,
    brandId,
    stock
  } = params;
  let whereClause = {
    limit,
    offset
  };
  
  if (categoryId) {
    whereClause.categoryId = categoryId
  }
  if (brandId) {
    whereClause.brandId = brandId
  }
  if (stock) {
    whereClause.stock = {
      [Op.is]: true
    }
  }
  console.log(whereClause)
  
}

const params = {
  categoryId: 'adsad',
  brandId: 'asdasd',
  stock: 1
}

