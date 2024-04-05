const multer = require('multer');
const path = require('path');

class Upload {
  constructor() {
    this.storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/');
      },
      filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
      }
    });

    this.fileFilter = (req, file, cb) => {
      if (file.mimetype.startsWith('image')) {
        cb(null, true);
      } else {
        cb(new Error('Não é uma imagem!'), false);
      }
    };

    this.uploader = multer({
      storage: this.storage,
      fileFilter: this.fileFilter,
    });
  }

  getUploadMiddleware() {
    return this.uploader;
  }
}

module.exports = new Upload().getUploadMiddleware();