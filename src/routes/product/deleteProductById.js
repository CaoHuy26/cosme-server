const Product = require('../../models/Product');

module.exports = async (req, res) => {
  const { productId } = req.params;
  
  try {
    const result = await Product.destroy({
      where: {
        id: productId
      }
    });
    
    if (result === 1) {
      res.status(200).json({
        statusCode: 200,
        success: true,
        msg: `Delete ${productId} success`
      });
    }
    else {
      res.status(404).json({
        statusCode: 404,
        success: false,
        msg: `Not found: ${productId}`
      });
    }
  }
  catch (err) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      msg: `Error ${err}`
    });
  }
};