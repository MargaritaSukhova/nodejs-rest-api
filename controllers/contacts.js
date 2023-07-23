const Contact = require("../models/contactModel");

const { HttpError, cntlrWrapper } = require("../helpers");

const getListContacts = async (req, res) => {
	const contacts = await Contact.find();
	res.json(contacts);
};

const contactById = async (req, res) => {
	const { contactId } = req.params;
	const contact = await Contact.findById(contactId);
	if (!contact) {
		throw HttpError(404, "Not found");
	}
	res.json(contact);
};

const postContact = async (req, res) => {
	const result = await Contact.create(req.body);
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

const updateContact = async (req, res) => {
	const { contactId } = req.params;
	const result = await Contact.findByIdAndUpdate(contactId, req.body, {
		new: true
	});
	if (!result) {
		throw HttpError(404, "Not found");
	}
	res.json(result);
};

// const updateStatusContact = async (contactId, body)

module.exports = {
	getListContacts: cntlrWrapper(getListContacts),
	contactById: cntlrWrapper(contactById),
	postContact: cntlrWrapper(postContact),
	deleteContact: cntlrWrapper(deleteContact),
	updateContact: cntlrWrapper(updateContact),
};
