const jwt = require('jsonwebtoken');

const secret = 'myDog';
const payload = {
  sub: 1,
  scope: 'Customer' 
}

function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}

const token = signToken(payload, secret);

console.log(token);