const Product = require('../models/Product');

// async () => { return await Product } == async () => { return Product }
const getProductById = async (productId) => {
  return Product.findByPk(productId);
};

const getProducts = async (limit, offset) => {
  return Product.findAll({
    limit,
    offset
  });
};

const getProductsByCategory = async (categoryId, limit, offset) => {
  return Product.findAll({
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