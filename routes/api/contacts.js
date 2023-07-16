const express = require("express");

const router = express.Router();

const Joi = require("joi");

const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require("../../models/contacts");

const HttpError = require("../../helpers/HttpError");

const schema = Joi.object({
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
		.regex(/^\(\d{3}\) \d{3}-\d{4}$/)
		.messages({
			"string.pattern.base": `Phone number must have (XXX) XXX-XXXX format`,
			"any.required": "missing required phone field",
		})
		.required(),
});

router.get("/", async (req, res, next) => {
	try {
		const contacts = await listContacts();
		res.json(contacts);
	} catch (error) {
		next(error);
	}
});

router.get("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const contact = await getContactById(contactId);
		if (!contact) {
			throw HttpError(404, "Not found");
		}
		res.json(contact);
	} catch (error) {
		next(error);
	}
});

router.post("/", async (req, res, next) => {
	try {
		const { error } = schema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}
		const result = await addContact(req.body);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
});

router.delete("/:contactId", async (req, res, next) => {
	try {
		const { contactId } = req.params;
		const result = await removeContact(contactId);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.json({ message: "contact deleted" });
	} catch (error) {
		next(error);
	}
});

router.put("/:contactId", async (req, res, next) => {
	try {
		if (JSON.stringify(req.body) === "{}") {
			throw HttpError(400, "missing fields");
		}
		const { error } = schema.validate(req.body);
		if (error) {
			throw HttpError(400, error.message);
		}
		const { contactId } = req.params;
		const result = await updateContact(contactId, req.body);
		if (!result) {
			throw HttpError(404, "Not found");
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
});

module.exports = router;
