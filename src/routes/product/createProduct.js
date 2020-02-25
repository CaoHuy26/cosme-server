const Product = require('../../models/Product');

module.exports = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(200).json({
      statusCode: 200,
      susscess: true,
      msg: 'Create Product success',
      data: newProduct
    });
  }
  catch (err) {
    res.status(200).json({
      statusCode: 500,
      susscess: false,
      msg: `Error: ${err}`,
      data: null
    });
  }
};