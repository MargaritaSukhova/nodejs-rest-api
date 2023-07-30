const { HttpError } = require("../helpers");

const validateSubscription = (schema) => {
	const func = (req, res, next) => {
		if (JSON.stringify(req.body) === "{}") {
			next(HttpError(400, "missing subscription field"));
		}
		const { error } = schema.validate(req.body);
		if (error) {
			next(HttpError(400, error.message));
		}
		next();
	};
	return func;
};

module.exports = validateSubscription;
