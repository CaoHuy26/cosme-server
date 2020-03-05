const { Op } = require('sequelize');
const Product = require('../models/Product');

const queryProduct = {
  // async () => { return await Product } == async () => { return Product }
  getProducts: async (limit, offset) => {
    return Product.findAll({
      limit,
      offset
    });
  },
  getProductById: async (productId) => {
    return Product.findByPk(productId);
  },
  // Filter
  getProductsByAttribute: async (limit, offset, query) => {
    let whereClause = {};
    const {
      categoryId,
      brandId,
      name,
      active,  // available product
      minPrice,
      maxPrice
    } = query;
  
    if (categoryId) {
      whereClause.categoryId = categoryId;
    }
    if (brandId) {
      whereClause.brandId = brandId;
    }
    if (name) {
      whereClause.name = {
        [Op.substring]: name
      };
    }
    if (active) { 
      whereClause.active = {
        [Op.is]: true
      }
    }
    if (minPrice && maxPrice) {
      whereClause.price = {
        [Op.between]: [minPrice, maxPrice]
      }
    }
  
    return Product.findAll({
      limit,
      offset,
      where: whereClause
    });
  }
};

module.exports = queryProduct;