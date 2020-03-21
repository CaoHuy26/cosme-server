const multer = require('multer');
const Datauri = require('datauri');
const path = require('path');

const storage = multer.memoryStorage();
const multerUploads = multer({ storage }).array('images');

// datauri: convert the buffer to the format that the Cloudinary uploader will understand
const dUri = new Datauri();
const dataUri = file => dUri.format(
    path.extname(file.originalname).toString(),
    file.buffer
  );

module.exports = { multerUploads, dataUri};