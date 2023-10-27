// import multer from 'multer'
// import { __dirname } from '../utils/utils.js'

// import { dirname, join } from 'path';
// import { fileURLToPath } from 'url';
// import multer from 'multer';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(dirname(__filename, '..'));

// const ProductImageUploader = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       return cb(null, join(__dirname, "..", `/public/img`))
//     },
//     filename: (req, file, cb) => {
//       const arr = file.originalname.split(".")
//       return cb(null, req.user.id + "-" + file.fieldname + "." + arr[1])
//     }
//   }),
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
//       return cb(new Error('Please upload a valid image file'))
//     }
//     cb(undefined, true)
//   }
// })

// const UserDocumentUploader = multer({
//   storage: multer.diskStorage({
//     destination: (req, file, cb) => {
//       return cb(null, join(__dirname, `/documents/`))
//     },
//     filename: (req, file, cb) => {
//       const arr = file.originalname.split(".")
//       return cb(null, req.user.id + "-" + file.fieldname + "." + arr[1])
//     }
//   }),
//   fileFilter(req, file, cb) {
//     if (!file.originalname.match(/\.(pdf|png|jpg|jpeg)$/)) {
//       return cb(new Error('Please upload a valid image file'))
//     }
//     cb(undefined, true)
//   }
// })

// // Define la ubicación donde deseas guardar las imágenes
// const uploadDirectory = join(__dirname, "..", 'public', 'img');

// // Configura multer para guardar las imágenes en esa ubicación
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadDirectory);
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// const upload = multer({ storage });

// export { __filename, __dirname, upload, UserDocumentUploader, ProductImageUploader };

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename));

// Define la ubicación donde deseas guardar las imágenes de productos
const productImageUploadDirectory = join(__dirname, 'public', 'img');

// Configura multer para guardar las imágenes de productos en esa ubicación
const productImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, productImageUploadDirectory);
  },
  filename: function (req, file, cb) {
    const arr = file.originalname.split(".");
    cb(null, req.user.id + "-" + file.fieldname + "." + arr[1]);
  },
});

const productImageUploader = multer({
  storage: productImageStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
      return cb(new Error('Please upload a valid image file'));
    }
    cb(null, true);
  },
});

// Define la ubicación donde deseas guardar los documentos de usuario
const userDocumentUploadDirectory = join(__dirname, 'documents');

// Configura multer para guardar los documentos de usuario en esa ubicación
const userDocumentStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, userDocumentUploadDirectory);
  },
  filename: function (req, file, cb) {
    const arr = file.originalname.split(".");
    cb(null, req.user.id + "-" + file.fieldname + "." + arr[1]);
  },
});

const userDocumentUploader = multer({
  storage: userDocumentStorage,
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(pdf|png|jpg|jpeg)$/)) {
      return cb(new Error('Please upload a valid document file'));
    }
    cb(null, true);
  },
});

export { __filename, __dirname, productImageUploader, userDocumentUploader };

