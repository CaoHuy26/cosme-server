const Product = require('../models/Product');

const getProductById = async (productId) => {
  return await  Product.findByPk(productId);
};

const getProducts = async (limit, offset) => {
  return await Product.findAll({
    limit,
    offset
  });
};

const getProductsByCategory = async (categoryId, limit, offset) => {
  return await Product.findAll({
    limit,
    offset,
    where: {
      categoryId
    }
  });
};

module.exports = {
  getProductById,
  getProducts,
  getProductsByCategory
};