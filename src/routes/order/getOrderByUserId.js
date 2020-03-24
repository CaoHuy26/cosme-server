const queryOrder = require('../../queries/Order');

module.exports = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await queryOrder.getOrderByUserId(userId);
    if (orders) {
      res.status(200).json({
        statusCode: 200,
        success: true,
        msg: `Get Orders of user ${userId} success`,
        data: {
          orders
        }
      });
    }
    else {
      res.status(404).json({
        statusCode: 404,
        success: false,
        msg: `Not found order of user ${userId}`,
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