const { mockRequest, mockResponse } = require("./interceptor");
const { logintest } = require("../controllers/auth-controller");
const User = require("../models/userModel");
const { comparePassword } = require("../helpers");

jest.mock("../models/userModel");
jest.mock("../helpers");

// res.status === 200
// res returns token
// res returns user with 2 fields email and subscription, typeof String

	const data = {
		token: "token",
		user: {
			email: "email",
			subscription: "subscription",
		},
	};

describe("Check method 'logintest' ", () => {
	test("should 200 and return correct value", async () => {
		const req = mockRequest();
		const res = mockResponse();

		User.findOne.mockImplementationOnce(() => ({
			id: 1,
			email: "email",
			password: "password",
		}));

		comparePassword.mockImplementationOnce(() => "hash");

		await logintest(req, res);
		expect(res.status).toHaveBeenCalledWith(200);
		expect(res.json).toHaveReturnedWith(data);
	});
});
