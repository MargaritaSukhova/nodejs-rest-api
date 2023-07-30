const Joi = require("joi");

const emailRegex = require("../constants/user-constants");

const userSingUpSchema = Joi.object({
	email: Joi.string().regex(emailRegex).required(),
	password: Joi.string().min(8).required(),
	subscription: Joi.string(),
});

const userSingInSchema = Joi.object({
	email: Joi.string().regex(emailRegex).required(),
	password: Joi.string().min(8).required(),
});


module.exports = { userSingUpSchema, userSingInSchema };