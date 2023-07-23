const express = require("express");

const router = express.Router();

const {
	getListContacts,
	contactById,
	postContact,
	deleteContact,
	updateContact,
} = require("../../controllers/contacts");

const {
	validateBody,
	validateBodyNotEmpty,
	isValidId,
} = require("../../middlewares");

const contactSchema = require("../../schemas/contacts");

router.get("/", getListContacts);

router.get("/:contactId", isValidId, contactById);

router.post(
	"/",
	validateBodyNotEmpty(),
	validateBody(contactSchema),
	postContact
);

router.delete("/:contactId", isValidId, deleteContact);

router.put(
	"/:contactId",
	isValidId,
	// validateBodyNotEmpty(),
	// validateBody(contactSchema),
	updateContact
);

router.patch("/:contactId/favorite", isValidId);

module.exports = router;
