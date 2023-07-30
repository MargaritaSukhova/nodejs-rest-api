const Joi = require("joi");

const phoneRegex = require("../constants/contacts-constants");

const contactSchema = Joi.object({
	name: Joi.string()
		.min(3)
		.max(30)
		.messages({
			"any.required": "missing required name field",
		})
		.required(),
	email: Joi.string()
		.email({ minDomainSegments: 2 })
		.messages({
			"any.required": "missing required email field",
		})
		.required(),
	phone: Joi.string()
		.regex(phoneRegex)
		.messages({
			"string.pattern.base": "Phone number must have (XXX) XXX-XXXX format",
			"any.required": "missing required phone field",
		})
		.required(),
	favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({
	favorite: Joi.boolean().required()
});
	
module.exports = { contactSchema, contactUpdateFavoriteSchema };
