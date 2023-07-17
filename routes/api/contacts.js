const express = require("express");

const router = express.Router();

const {
	getListContacts,
	contactById,
	postContact,
  deleteContact,
  putContact
} = require("../../controllers/contacts");

const { validateBody, validateBodyNotEmpty } = require("../../middlewares");

const contactSchema = require("../../schemas/contacts")

router.get("/", getListContacts);

router.get("/:contactId", contactById);

router.post("/", validateBody(contactSchema), postContact);

router.delete("/:contactId", deleteContact);

router.put(
	"/:contactId",
	validateBodyNotEmpty(), validateBody(contactSchema),
	putContact
);

module.exports = router;
