const orderRouter = require('express').Router();

const createOrder = require('./createOrder');
const cancelOrderById = require('./cancelOrderById');
const getOrderById = require('./getOrderById');
const getOrderByUserId = require('./getOrderByUserId');

orderRouter.get('/:orderId', getOrderById);
orderRouter.get('/u/:userId', getOrderByUserId);
orderRouter.post('/order', createOrder);
orderRouter.put('/:orderId', cancelOrderById);

module.exports = orderRouter;