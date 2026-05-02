const multer = require('multer');
const { storage } = require('../config/cloudinary');

const useCloudinary = !!(
  process.env.CLOUDINARY_CLOUD_NAME &&
  process.env.CLOUDINARY_API_KEY &&
  process.env.CLOUDINARY_API_SECRET
);

const localStorage = multer.memoryStorage();

const upload = multer({ storage: useCloudinary ? storage : localStorage });

module.exports = upload;
