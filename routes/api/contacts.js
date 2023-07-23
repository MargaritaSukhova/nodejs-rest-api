const express = require("express");

const router = express.Router();

const {
	getListContacts,
	contactById,
	postContact,
	deleteContact,
	updateContact,
	updateStatusContact,
} = require("../../controllers/contacts");

const {
	validateBody,
	validateBodyNotEmpty,
	isValidId,
} = require("../../middlewares");

const {
	contactSchema,
	contactUpdateFavoriteSchema,
} = require("../../schemas/contacts");

router.get("/", getListContacts);

router.get("/:contactId", isValidId, contactById);

router.post(
	"/",
	validateBody(contactSchema),
	postContact
);

router.delete("/:contactId", isValidId, deleteContact);

router.put(
	"/:contactId",
	isValidId,
	validateBody(contactSchema),
	updateContact
);

router.patch(
	"/:contactId/favorite",
	isValidId,
	validateBodyNotEmpty(),
	validateBody(contactUpdateFavoriteSchema),
	updateStatusContact
);

module.exports = router;
