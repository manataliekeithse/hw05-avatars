import multer from "multer";
import path from "path";

const tempPath = path.join("tmp");

const multerConfig = multer.diskStorage({
  destination: tempPath,
  filename: (_req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: multerConfig,
});

export { upload };
