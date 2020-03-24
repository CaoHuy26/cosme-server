const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const OrderProduct = require('../models/OrderProduct');

const queryOrder = {
  getOrders: async () => {
    return Order.findAll();
  },
  getOrderById: async orderId => {
    const order = await Order.findByPk(orderId);
    if (!order) {
      return null;
    }
    const orderProducts = await OrderProduct.findAll({
      raw: true,
      attributes: ['product.name', 'price', 'quantity'],
      include: [
        {
          model: Product,
          attributes: [],
          required: true
        },
        {
          model: Order,
          attributes: [],
          required: true,
          include: [{
            model: User,
            attributes: [],
            required: true
          }],
          where: {
            id: orderId
          }
        }
      ]
    });

    const products = [];
    for (orderProduct of orderProducts) {
      products.push(orderProduct)
    }
    order.dataValues.products = products;

    return order;
  }
};

module.exports = queryOrder;