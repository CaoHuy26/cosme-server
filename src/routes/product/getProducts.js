const Product = require('../../models/Product');

module.exports = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.status(200).json({
      statusCode: 200,
      success: true,
      msg: 'Get all product success',
      data: products
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