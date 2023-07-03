const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 =require('multer-s3') 
const BUCKET = process.env.LIARA_BUCKET_NAME;

const config = {
  endpoint: process.env.LIARA_ENDPOINT,
  accessKeyId: process.env.LIARA_ACCESS_KEY,
  secretAccessKey: process.env.LIARA_SECRET_KEY,
  region: process.env.REGION,
};

const s3 = new AWS.S3(config);

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  },
});
// const upload = multer({
//   storage: multerS3({
//     s3,
//     bucket: process.env.LIARA_ENDPOINT,
//     key: function (req, file, cb) {
//       console.log(file);
//       cb(null, file.originalname);
//     },
//   }),
// });

module.exports = { upload };
