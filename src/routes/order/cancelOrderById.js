const Order = require('../../models/Order');
const OrderStatusHistory = require('../../models/OrderStatusHistory');

module.exports = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await Order.findByPk(orderId);
    if (order) {
      if (order.getDataValue('orderStatusId') === '0') {
        res.status(500).json({
          statusCode: 500,
          success: false,
          msg: `Order ${orderId} has been cancelled before`,
          data: null
        });
      }
      
      const cancelOrder = await order.update({
        orderStatusId: 0 // Order false
      });

      await OrderStatusHistory.create({
        orderId: order.getDataValue('id'),
        orderStatusId: 0
      });

      res.status(200).json({
        statusCode: 200,
        success: true,
        msg: `Cancel Order ${orderId} success`,
        data: {
          order: cancelOrder
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