const express = require("express");

const authRouter = express.Router();

const { register, login } = require("../../controllers/auth-controller");

const {
	validateBody,
	validateBodyNotEmpty,
	isValidId,
} = require("../../middlewares");

const { userSingUpSchema, userSingInSchema } = require("../../schemas/users");

authRouter.post("/register", validateBody(userSingUpSchema), register);

authRouter.post("/login", validateBody(userSingInSchema), login);

module.exports = authRouter;