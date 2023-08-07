const validateBody = require("./validateBody");
const validateBodyNotEmpty = require("./validateBodyNotEmpty");
const isValidId = require("./isValidId");
const { authenticate } = require('./authenticate')
const upload = require('./upload');

module.exports = {
	validateBody,
	validateBodyNotEmpty,
	isValidId,
	authenticate,
	upload,
};
