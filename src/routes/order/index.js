const orderRouter = require('express').Router();

const createOrder = require('./createOrder');
const getOrderById = require('./getOrderById');
const cancelOrderById = require('./cancelOrderById');

orderRouter.get('/:orderId', getOrderById);
orderRouter.post('/order', createOrder);
orderRouter.put('/:orderId', cancelOrderById);

module.exports = orderRouter;