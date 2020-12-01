import express from "express";
import path from "path";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const FileTypes = /jpg|jpeg|png/;
  const extName = FileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimeType = FileTypes.test(file.mimetype);

  if (extName && mimeType) {
    return cb(null, true);
  } else {
    return cb("Images Only!!");
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

router.post("/", upload.single("image"), (req, res) => {
  res.send(`/${req.file.path}`);
});

export default router;
