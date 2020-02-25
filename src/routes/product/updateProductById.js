const Product = require('../../models/Product');

module.exports = async (req, res) => {
  const { productId } = req.params;

  try {
    const product = await Product.findByPk(productId);

    if (!product) {
      res.status(404).json({
        statusCode: 404,
        success: false,
        msg: `Not found: ${productId}`,
        data: null
      });
    }
    else {
      const newProduct = await product.update(req.body);
  
      res.status(200).json({
        statusCode: 200,
        success: true,
        mgs: `Update ${productId} success`,
        data: newProduct
      });
    }
  }
  catch (err) {
    res.status(500).json({
      statusCode: 500,
      success: true,
      mgs: `Error: ${err}`,
      data: null
    });
  }
};