const productRouter = require('express').Router();

const getProducts = require('./getProducts');
const createProduct = require('./createProduct');
const getProductById = require('./getProductById');
const updateProductById = require('./updateProductById');
const deleteProductById = require('./deleteProductById');

// TODO: Add validation

productRouter.get('/products', getProducts);
productRouter.post('/product', createProduct);
productRouter.get('/:productId', getProductById);
productRouter.put('/:productId', updateProductById);
productRouter.delete('/:productId', deleteProductById);

module.exports = productRouter;