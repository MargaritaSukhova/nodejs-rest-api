const { Schema, model } = require("mongoose");

const {
	handleSaveError,
	hadleValidateWhenUpdating,
} = require("../models/hooks");

const phoneRegex = require("../constants/contacts-constants")

const contactSchema = Schema(
	{
		name: { type: String, required: [true, "Set name for contact"] },
		email: { type: String, unique: true, required: true },
		phone: {
			type: String,
			match: [phoneRegex, "Phone number must have (XXX) XXX-XXXX format"],
			unique: true,
			required: true,
		},
		favorite: { type: Boolean, default: false },
		owner: {
			type: Schema.Types.ObjectId,
			ref: "user",
		},
	},
	{ versionKey: false }
);

contactSchema.pre("findOneAndUpdate", hadleValidateWhenUpdating);

contactSchema.post("save", handleSaveError);

contactSchema.post("findOneAndUpdate", handleSaveError);

const Contact = model("contact", contactSchema);

module.exports = Contact;
