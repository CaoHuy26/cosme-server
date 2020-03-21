const Product = require('../../models/Product');
const queryProduct = require('../../queries/Product');

module.exports = async (req, res) => {
  const { productId } = req.params;
  
  try {
    const product = await Product.findByPk(productId);

    if (product) {
      queryProduct.deleteProductById(productId);
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