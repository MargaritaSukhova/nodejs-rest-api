const fs = require("fs").promises;

const path = require("path");

const gravatar = require("gravatar");

const Jimp = require("jimp");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const { v4: uuidv4 } = require("uuid");

const User = require("../models/userModel");

require("dotenv").config();

const { JWT_SECRET, BASE_URL } = process.env;

const {
	HttpError,
	cntlrWrapper,
	comparePassword,
	sendEmail,
} = require("../helpers");

const register = async (req, res) => {
	const { email, password } = req.body;
	const avatarURL = gravatar.url(email, { s: 250 });
	const user = await User.findOne({ email });
	if (user) {
		throw HttpError(409, "Email in use");
	}
	const hashPassword = await bcrypt.hash(password, 10);
	const verificationToken = uuidv4();

	const newUser = await User.create({
		...req.body,
		password: hashPassword,
		avatarURL,
		verificationToken,
	});

	const verifyEmail = {
		to: email,
		subject: "Verify your email",
		html: `<a
				href="${BASE_URL}/users/verify/${verificationToken}"
				target="_blank"
			>
				Click to verify your email
			</a>`,
	};

	await sendEmail(verifyEmail);

	res.status(201).json({
		user: { email: newUser.email, subscription: newUser.subscription },
	});
};

const verify = async (req, res) => {
	const { verificationToken } = req.params;
	const user = await User.findOne({ verificationToken });
	if (!user) {
		throw HttpError(404, "User not found");
	}
	await User.findByIdAndUpdate(user._id, {
		verify: true,
		verificationToken: null,
	});

	res.json({ message: "Verification successful" });
};

const resendVerifyEmail = async (req, res) => {
	const { email } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(400, "User not found")
	}
	if (user.verify) {
		throw HttpError(400, "Verification has already been passed");
	}

		const verifyEmail = {
			to: email,
			subject: "Verify your email",
			html: `<a
				href="${BASE_URL}/users/verify/${user.verificationToken}"
				target="_blank"
			>
				Click to verify your email
			</a>`,
		};

	await sendEmail(verifyEmail);
	
	res.json({ message: "Verification email sent" });

};

const login = async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (!user) {
		throw HttpError(401, "Email or password is wrong");
	}

	if (!user.verify) {
		throw HttpError(403, "Email is not verified");
	}

	const passwordCompare = comparePassword(password, user.password);

	if (!passwordCompare) {
		throw HttpError(401, "Email or password is wrong");
	}

	const payload = {
		id: user._id,
	};

	const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

	await User.findByIdAndUpdate(user._id, { token });

	res.status(200).json({
		token,
		user: { email: user.email, subscription: user.subscription },
	});
};

const getCurrent = (req, res) => {
	const { email, subscription } = req.user;

	res.json({ email, subscription });
};

const logout = async (req, res) => {
	const { _id } = req.user;

	await User.findByIdAndUpdate(_id, { token: "" });

	res.status(204).json();
};

const updateSubscription = async (req, res) => {
	const { _id } = req.user;
	const user = await User.findByIdAndUpdate(_id, req.body, {
		new: true,
	});
	if (!user) {
		throw HttpError(404, "Not found");
	}
	res.json({
		_id: user._id,
		email: user.email,
		subscription: user.subscription,
	});
};

const avatarPath = path.resolve("public", "avatars");

const updateAvatar = async (req, res) => {
	const { _id } = req.user;
	const { path: oldPath, filename } = req.file;
	const avatar = await Jimp.read(oldPath);
	await avatar.resize(250, 250);
	await avatar.write(oldPath);
	const newPath = path.join(avatarPath, filename);
	await fs.rename(oldPath, newPath);
	const avatarURL = path.join("avatars", filename);
	await User.findByIdAndUpdate(_id, { avatarURL }, { new: true });
	res.json({ avatarURL });
};

module.exports = {
	register: cntlrWrapper(register),
	verify: cntlrWrapper(verify),
	resendVerifyEmail: cntlrWrapper(resendVerifyEmail),
	login: cntlrWrapper(login),
	getCurrent: cntlrWrapper(getCurrent),
	logout: cntlrWrapper(logout),
	updateSubscription: cntlrWrapper(updateSubscription),
	updateAvatar: cntlrWrapper(updateAvatar),
	logintest: login,
};
