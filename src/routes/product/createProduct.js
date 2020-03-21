const Product = require('../../models/Product');
const ProductImage = require('../../models/ProductImage');
const { uploadImages } = require('../../utils/upload');

module.exports = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    
    const images = req.files;
    const imageUrls = [];
    for (const image of images) {
      const result = await uploadImages(image, 'products');
      const newProductImage = await ProductImage.create({
        productId: newProduct.getDataValue('id'),
        image: result.url
      });
      imageUrls.push(newProductImage.getDataValue('image'));
    }
    // Add images property for product
    newProduct.dataValues.images = imageUrls;

    res.status(200).json({
      statusCode: 200,
      susscess: true,
      msg: 'Create Product success',
      data: {
        product: newProduct
      }
    });
  }
  catch (err) {
    res.status(500).json({
      statusCode: 500,
      susscess: false,
      msg: `Error: ${err}`,
      data: null
    });
  }
};