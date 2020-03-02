const { getProducts, getProductsByCategory } = require('../../queries/Product');

module.exports = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 4;
  const offset = (page - 1) * limit;

  const { categoryId } = req.query;

  // TODO: Fix when offset > number of data product
  try {
    let products = null;
    if (categoryId) {
      products = await getProductsByCategory(categoryId, limit, offset);
    }
    else {
      products = await getProducts(limit, offset);
    }
    
    res.status(200).json({
      statusCode: 200,
      success: true,
      page,
      limit,
      offset,
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