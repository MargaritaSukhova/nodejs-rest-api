const handleSaveError = (error, data, next) => {
	error.status = 400;
	next();
};

const hadleValidateWhenUpdating = function(next) {
	this.options.runValidators = true;
	next();
}
module.exports = { handleSaveError, hadleValidateWhenUpdating };
