const Joi = require("joi");

const { emailRegex, subscriptionList } = require("../constants/user-constants");

const userSingUpSchema = Joi.object({
	email: Joi.string()
		.regex(emailRegex)
		.messages({
			"any.required": "missing required email field",
		})
		.required(),
	password: Joi.string()
		.min(8)
		.messages({
			"any.required": "missing required password field",
		})
		.required(),
	subscription: Joi.string(),
});

const userSingInSchema = Joi.object({
	email: Joi.string()
		.regex(emailRegex)
		.messages({
			"any.required": "missing required email field",
		})
		.required(),
	password: Joi.string()
		.min(8)
		.messages({
			"any.required": "missing required password field",
		})
		.required(),
});

const userUpdateSubscriptionSchema = Joi.object({
	subscription: Joi.string()
		.valid(...subscriptionList)
		.messages({
			"any.only":
				"Subscription type must be one of the following: starter, pro or business",
		})
		.required(),
});


module.exports = {
	userSingUpSchema,
	userSingInSchema,
	userUpdateSubscriptionSchema,
};