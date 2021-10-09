const express = require('express');
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

const application = express();

application.use(express.json());
application.use(express.urlencoded({ extended: true }));

application.get('/protected', expressJwt({ secret: process.env.SECRET_KEY, algorithms: ['HS256'] }), async (request, response) => {
  const decoded = jwt.verify(
    request.headers.authorization.split(' ')[1],
    process.env.SECRET_KEY
  );
  response.json({ message: `Hello, ${decoded.username}!!!` });
})

application.post('/i-need-token', async (request, response) => {
  const token = jwt.sign(
    { username: request.body.username },
    process.env.SECRET_KEY,
    { algorithm: 'HS256' }
  );
  response.json({ token });
})

application.use(async (error, request, response, next) => {
  if (error.name === 'UnauthorizedError') {
    response.status(401).json({ errors: ['invalid token'] })
  }
})

module.exports = application;

