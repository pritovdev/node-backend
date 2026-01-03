const { Strategy } = require('passport-local');
const AuthService = require('../../../services/auth.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const service = new AuthService();

const options = {
  usernameField: 'email',
  passwordField: 'password'
}

const LocalStrategy = new Strategy(options, async (email, password, done) => {
  try {
    const user = await service.getUser(email, password);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

module.exports = LocalStrategy;