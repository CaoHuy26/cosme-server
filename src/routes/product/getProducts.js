const queryProduct = require('../../queries/product');

module.exports = async (req, res) => {
  const { query } = req;
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 4;
  const offset = (page - 1) * limit;

  // TODO: Fix when offset > number of data product
  try {
    let products = null;
    if (query) {
      products = await queryProduct.getProductsByAttribute(limit, offset, query);
    }
    else {
      // Get all products
      products = await queryProduct.getProducts(limit, offset);
    }
    
    res.status(200).json({
      statusCode: 200,
      success: true,
      page,
      limit,
      offset,
      query,
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