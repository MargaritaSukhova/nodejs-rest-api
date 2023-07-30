const bcrypt = require("bcryptjs");

const User = require("../models/userModel");

const { HttpError, cntlrWrapper } = require("../helpers");

const register = async (req, res) => {
  const { email, password } = (req.body);
  const user = await User.findOne({ email })
  if (user) {
    throw HttpError(409, "Email in use")
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({ user: { email: newUser.email, subscription: newUser.subscription} });
};

const login = async (req, res) => {
	const { email, password } = req.body;
	const user = await User.findOne({ email });
	if (!user) {
		throw HttpError(401, "Email or password is wrong");
  }
  const passwordCompare = await bcrypt.compare(password, user.password);
  console.log(passwordCompare);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
	
  const token = 1111
	res.status(201).json({token, 
		user: { email: user.email, subscription: user.subscription },
	});
};

module.exports = {
	register: cntlrWrapper(register),
	login: cntlrWrapper(login),
};