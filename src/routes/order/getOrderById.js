const queryOrder = require('../../queries/Order');

module.exports = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await queryOrder.getOrderById(orderId);
    if (order) {
      res.status(200).json({
        statusCode: 200,
        success: true,
        msg: `Get Order ${orderId} success`,
        data: {
          order
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