const Order = require('../../models/Order');
const OrderProduct = require('../../models/OrderProduct');
const OrderStatusHistory = require('../../models/OrderStatusHistory');

module.exports = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    
    const { products } = req.body;
    let newOrderProducts = [];
    for (let i = 0; i < products.length; i++) {
      newOrderProducts.push(
        await OrderProduct.create({
          productId: products[i].productId,
          quantity: products[i].quantity,
          price: products[i].price,
          orderId: newOrder.getDataValue('id')
        })
      )
    }

    await OrderStatusHistory.create({
      orderId: newOrder.getDataValue('id'),
      orderStatusId: newOrder.getDataValue('orderStatusId')
    });

    res.status(200).json({
      statusCode: 200,
      success: true,
      msg: 'Create Order success',
      data: {
        order: newOrder,
        orderProduct: newOrderProducts
      }
    });
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