const { Schema, model } = require("mongoose");

const { handleSaveError } = require("../models/hooks");

const contactSchema = Schema({
	name: { type: String, required: true },
	email: { type: String, unique: true, required: true },
	phone: {
		type: String,
		match: [
			/^\(\d{3}\) \d{3}-\d{4}$/,
			"Phone number must have (XXX) XXX-XXXX format",
		],
		unique: true,
		required: true,
	},
	favorite: { type: Boolean, default: false },
});

contactSchema.post("save", handleSaveError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
