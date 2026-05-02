const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || '123456',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'abc123'
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'amt-store',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
  }
});

module.exports = { cloudinary, storage };
