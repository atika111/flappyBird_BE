require('dotenv').config()
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET,
// });

cloudinary.config({ 
  cloud_name: 'dwiiz8ilo', 
  api_key: '541327681734697', 
  api_secret: '0czaixRACJvnNJ9qp2bBHsnE2O0' 
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Users-Images", 
    format: async (req, file) => "png",
    public_id: (req, file) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      return "avatar-" + uniqueSuffix;
    },
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
