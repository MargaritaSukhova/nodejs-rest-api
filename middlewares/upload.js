const multer = require("multer");
const path = require("path");

const destination = path.resolve("tmp");

const storage = multer.diskStorage({
	destination,
	filename: (req, file, cb) => {
		const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const { originalname } = file;
    const filename = `${uniqueSuffix}_${originalname}`;
    cb(null, filename)
	},
});

const limits = {
  fileSize: 1024 * 1024 * 5,
}

const upload = multer({ storage, limits })

module.exports = upload;