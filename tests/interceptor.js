module.exports = {
	mockRequest: () => {
		const req = {};
		req.body = jest.fn().mockReturnValue(req);
		req.params = jest.fn().mockReturnValue(req);
		return req;
	},

	mockResponse: () => {
		const data = {
			token: "token",
			user: {
				email: "email",
				subscription: "subscription",
			},
		};
		const res = {};
		res.send = jest.fn().mockReturnValue(res);
		res.status = jest.fn().mockReturnValue(res);
		res.json = jest.fn().mockReturnValue(data);
		return res;
	},
};
