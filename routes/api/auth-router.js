const express = require("express");

const authRouter = express.Router();

const {
	register,
	login,
	getCurrent,
	logout,
	updateSubscription,
	updateAvatar,
} = require("../../controllers/auth-controller");

const { validateBody, authenticate, upload } = require("../../middlewares");

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

authRouter.patch("/avatars", authenticate, upload.single('avatar'), updateAvatar);

module.exports = authRouter;
