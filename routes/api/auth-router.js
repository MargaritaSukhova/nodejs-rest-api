const express = require("express");

const authRouter = express.Router();

const {
	register,
	login,
	getCurrent,
	logout,
	updateSubscription,
} = require("../../controllers/auth-controller");

const { validateBody, authenticate } = require("../../middlewares");

const {
	userSingUpSchema,
	userSingInSchema,
	userUpdateSubscriptionSchema,
} = require("../../schemas/users");

authRouter.post("/register", validateBody(userSingUpSchema), register);

authRouter.post("/login", validateBody(userSingInSchema), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.post("/logout", authenticate, logout);

authRouter.patch("/", authenticate, validateBody(userUpdateSubscriptionSchema), updateSubscription);

module.exports = authRouter;
