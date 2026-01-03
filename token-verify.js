const jwt = require('jsonwebtoken');

const secret = 'dawfcsadasd';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEzLCJyb2xlIjoiQ3VzdG9tZXIiLCJpYXQiOjE3NjcwMTcwNDV9.DPKx629l-2bH4GjGtCO0bWbdq6pN29w2uthknsNLTPI';
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);

console.log(payload);