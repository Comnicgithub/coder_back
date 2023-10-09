// import multer from 'multer'
// import { __dirname } from '../utils/utils.js'

// const ProductImageUploader = multer({
//     storage: multer.diskStorage({
//         destination: (req,file,cb) => cb(null,__dirname+'/public/img'),
//         filename: (req,file,cb) => cb(null,file.originalname)
//     })
// })

// const UserDocumentUploader = multer({
//     storage: multer.diskStorage({
//         destination: (req,file,cb) => cb(null,__dirname+`/src/documents/${req.user.id}`),
//         filename: (req,file,cb) => cb(null, req.body.type)
//     })
// })

// export {
//     ProductImageUploader,
//     UserDocumentUploader
// }

import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(dirname(__filename, '..'));

// Define la ubicación donde deseas guardar las imágenes
const uploadDirectory = join(__dirname, 'public', 'img');

// Configura multer para guardar las imágenes en esa ubicación
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDirectory);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

export { __filename, __dirname, upload };

