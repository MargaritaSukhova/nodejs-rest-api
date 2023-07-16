const { HttpError } = require("../helpers");

const validateBodyNotEmpty = () => {
	const func = (req, res, next) => {
			if (JSON.stringify(req.body) === "{}") {
				next(HttpError(400, "missing fields"));
			}
		next();
	};
	return func;
};

module.exports = validateBodyNotEmpty;