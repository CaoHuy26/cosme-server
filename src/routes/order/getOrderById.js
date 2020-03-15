const Order = require('../../models/Order');
const OrderProduct = require('../../models/OrderProduct');
const Product = require('../../models/Product');
const User = require('../../models/User');

module.exports = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findByPk(orderId);
    if (order) {
      const orderProducts = await OrderProduct.findAll({
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
            attributes: [],
            required: true,
            include: [{
              model: User,
              attributes: ['email'],
              required: true
            }],
            where: {
              id: orderId
            }
          }
        ]
      });

      res.status(200).json({
        statusCode: 200,
        success: true,
        msg: `Get Order ${orderId} success`,
        data: {
          order,
          orderProducts
        }
      });
    }
    else {
      res.status(404).json({
        statusCode: 404,
        success: false,
        msg: `Not found: ${orderId}`,
        data: null
      });
    }
  }
  catch (err) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      msg: `Error: ${err}`,
      data: null
    });
  }
};