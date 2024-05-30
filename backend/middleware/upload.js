import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // const directory = "../images";
    const directory = path.join(__dirname, "..", "images");
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }
    cb(null, directory);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

const validateFileUpload = (req, res, next) => {
  upload.array("files", 5)(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        error: err,
        message: "More than 5 files are not allowed",
      });
    }
    if (!req.files) {
      return res.status(400).json({
        message: "Files are required",
      });
    }

    const files = req.files;
    console.log(files);
    const errors = [];

    files.forEach((file) => {
      const allowedType = ["image/png", "image/jpg", "image/jpeg"];
    });
    if (errors.length > 0) {
      files.forEach((file) => {
        fs.unlinkSync(file.path);
      });
      return res.status(400).json(errors);
    }

    req.files = files;
    next();
  });
};

export default validateFileUpload;
