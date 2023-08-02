const express = require("express");

const contactsRouter = express.Router();

const {
	getListContacts,
	contactById,
	postContact,
	deleteContact,
	updateContact,
	updateStatusContact,
} = require("../../controllers/contacts-controller");

const {
	validateBody,
	validateBodyNotEmpty,
	isValidId,
	authenticate,
} = require("../../middlewares");

const {
	contactSchema,
	contactUpdateFavoriteSchema,
} = require("../../schemas/contacts");

contactsRouter.use(authenticate);

contactsRouter.get("/", getListContacts);

contactsRouter.get("/:contactId", isValidId, contactById);

contactsRouter.post("/", validateBody(contactSchema), postContact);

contactsRouter.delete("/:contactId", isValidId, deleteContact);

contactsRouter.put(
	"/:contactId",
	isValidId,
	validateBody(contactSchema),
	updateContact
);

contactsRouter.patch(
	"/:contactId/favorite",
	isValidId,
	validateBodyNotEmpty(),
	validateBody(contactUpdateFavoriteSchema),
	updateStatusContact
);

module.exports = contactsRouter;
