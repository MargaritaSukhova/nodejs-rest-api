const { Schema, model } = require("mongoose");

const {
	handleSaveError,
	hadleValidateWhenUpdating,
} = require("../models/hooks");

const { emailRegex, subscriptionList } = require("../constants/user-constants");

const userSignUpSchema = Schema(
	{
		email: {
			type: String,
			match: emailRegex,
			unique: true,
			required: [true, "Email is required"],
		},
		password: {
			type: String,
			minlength: 8,
			required: [true, "Password is required"],
		},
		subscription: {
			type: String,
			enum: subscriptionList,
			default: "starter",
		},
		token: {
			type: String,
			default: null,
		},
		avatarURL: String,
		verify: {
			type: Boolean,
			default: false,
		},
		verificationToken: {
			type: String,
		},
	},
	{ versionKey: false }
);

userSignUpSchema.pre("findOneAndUpdate", hadleValidateWhenUpdating);

userSignUpSchema.post("save", handleSaveError);

userSignUpSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSignUpSchema);

module.exports = User;
