const queryProduct = require('../../queries/product');

module.exports = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await queryProduct.getProductById(productId);

    if (product) {
      res.status(200).json({
        statusCode: 200,
        success: true,
        msg: `Get product ${productId} success`,
        data: product
      });
    }
    else {
      res.status(404).json({
        statusCode: 404,
        success: false,
        msg: `Not found: ${productId}`,
        data: null
      });
    }
  }
  catch (err) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      msg: `Error: ${err}`
    });
  }
};