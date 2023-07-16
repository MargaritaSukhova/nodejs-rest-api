

const {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
} = require("../models/contacts");

const { HttpError, cntlrWrapper } = require("../helpers");



const getListContacts = async (req, res) => {
	const contacts = await listContacts();
	res.json(contacts);
};

const contactById = async (req, res) => {
	const { contactId } = req.params;
	const contact = await getContactById(contactId);
	if (!contact) {
		throw HttpError(404, "Not found");
	}
	res.json(contact);
};

const postContact = async (req, res) => {
	const result = await addContact(req.body);
	res.status(201).json(result);
};

const deleteContact = async (req, res) => {
	const { contactId } = req.params;
	const result = await removeContact(contactId);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json({ message: "contact deleted" });
};

const putContact = async (req, res) => {

	const { contactId } = req.params;
	const result = await updateContact(contactId, req.body);
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

module.exports = {
	getListContacts: cntlrWrapper(getListContacts),
	contactById: cntlrWrapper(contactById),
	postContact: cntlrWrapper(postContact),
	deleteContact: cntlrWrapper(deleteContact),
	putContact: cntlrWrapper(putContact),
};
