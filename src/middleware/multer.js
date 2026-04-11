import multer from 'multer';
import createHttpError from 'http-errors';

const MAX_FILE_SIZE = 4 * 1024 * 1024;

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];

  if (!allowedMimeTypes.includes(file.mimetype)) {
    return cb(createHttpError(400, 'Only JPG and PNG images are allowed'));
  }

  cb(null, true);
};

const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
});

export const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return next(createHttpError(400, 'Image size must be less than 1MB'));
    }
    return next(createHttpError(400, err.message));
  }
  next(err);
};

export const uploadImages = upload.array('images', 10);
