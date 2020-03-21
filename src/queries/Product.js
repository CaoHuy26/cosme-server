const { Op } = require('sequelize');
const Product = require('../models/Product');
const ProductImage = require('../models/ProductImage');
const ProductRating = require('../models/ProductRating');
const ProductReview = require('../models/ProductReview');
const OrderProduct = require('../models/OrderProduct');

const queryProduct = {
  // async () => { return await Product } == async () => { return Product }
  getProducts: async (limit, offset) => {
    return Product.findAll({
      limit,
      offset
    });
  },
  getProductById: async (productId) => {
    const product = await Product.findByPk(productId);
    if (!product) {
      return null;
    }
    
    const productImages = await ProductImage.findAll({
      raw: true,
      attributes: ['image'],
      include: [{
        model: Product,
        required: true,
        attributes: [],
        where: {
          id: productId
        }
      }]
    });
    // Change image object to string
    let images = [];
    for (productImage of productImages) {
      images.push(productImage.image)
    }
    product.dataValues.images = images;
    
    return product;
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
  },

  deleteProductById: async productId => {
    await Promise.all([
      ProductImage.destroy({
        where: {
          productId
        }
      }),
      ProductRating.destroy({
        where: {
          productId
        }
      }),
      ProductReview.destroy({
        where: {
          productId
        }
      }),
      OrderProduct.destroy({
        where: {
          productId
        }
      }),
      Product.destroy({
        where: {
          id: productId
        }
      })
    ]);
  }
};

module.exports = queryProduct;