const { logintest } = require("../controllers/auth-controller");

const httpMocks = require('node-mocks-http');

const response = httpMocks.createResponse();
const request = httpMocks.createRequest();

// res.status === 200
// res returns token
// res returns user with 2 fields email and subscription, typeof String

describe('logintest',  () => {
  test('res.status === 200', async () => {
  const res = await logintest(request, response);
  expect(res.status).toBe("200");
});
})

