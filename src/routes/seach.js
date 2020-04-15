const searchRouter = require('express').Router();
const client = require('../configs/elasticsearch');
const elasticIndex = require('../constants/elasticIndex');

/**
 * PRODUCT:
 *  - id
 *  - image
 *  - name
 *  - price
 *  - category
 *  - brand
 */
searchRouter.post('/', async (req, res) => {
  const { name, category, brand } = req.query;
  // Search by product attribute
  try {
    if (Object.keys(req.query).length !== 0) {
      let conditions = [];
      if (name) {
        conditions.push({ match: { name } });
      }
      if (category) {
        conditions.push({ match: { category } });
      }
      if (brand) {
        conditions.push({ match: { brand } });
      }
      console.log(conditions);
      
      const data = await client.search({
        index: elasticIndex.product,
        body: {
          query: {
            bool: {
              must: conditions
            }
          }
        }
      });
      const products = data.hits.hits;
      
      if (products.length === 0) {
        res.status(404).json({
          statusCode: 404,
          success: false,
          msg: 'Not found',
          total: products.length,
          products
        });
      }
      res.status(200).json({
        statusCode: 200,
        success: true,
        msg: 'Get products',
        total: products.length,
        products
      });
    }
    // Search all product
    else {
      const data = await client.search({
        index: elasticIndex.product,
        body: {
          query: {
            match_all: {}
          }
        }
      });
      const products = data.hits.hits;
    
      res.status(200).json({
        statusCode: 200,
        success: true,
        msg: 'Get all product',
        total: products.length,
        products
      });
    }
  }
  catch (err) {
    res.status(500).json({
      statusCode: 500,
      success: false,
      msg: `Error: ${err}`,
      products: null
    });
  }
});

module.exports = searchRouter;