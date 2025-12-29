const jwt = require('jsonwebtoken');

const secret = 'myDog';
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInNjb3BlIjoiQ3VzdG9tZXIiLCJpYXQiOjE3NjY3NzI4NDV9.R7TflJg2SS3oWS_V-P1pxZ18JKWGZzFPCHvsWRG2NRs';
function verifyToken(token, secret) {
  return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);

console.log(payload);