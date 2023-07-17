const cntlrWrapper = (cntlr) => {
	const func = async (req, res, next) => {
		try {
			await cntlr(req, res, next);
		} catch (error) {
			next(error);
		}
	};
	return func;
};

module.exports = cntlrWrapper;
