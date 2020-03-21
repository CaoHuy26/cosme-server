// Upload file to cloudinary
const cloudinary = require('../configs/cloudinary');
const { dataUri } = require('../middlewares/multer');

exports.uploadImages = async (file, folder) => {
  const result = await cloudinary.uploader.upload(
    dataUri(file).content, {
      folder
    }
  );

  return result;
};