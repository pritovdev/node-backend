const { Strategy } = require('passport-local');
const UserService = require('../../../services/user.service');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

const service = new UserService();

const options = {
  usernameField: 'email',
  passwordField: 'password'
}

const LocalStrategy = new Strategy(options, async (email, password, done) => {
  try {
    const user = await service.findByEmail(email);
    if (!user) {
      return done(boom.unauthorized(), false)
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(boom.unauthorized(), false)
    }
    delete user.dataValues.password;
    delete user.dataValues.createdAt;
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

module.exports = LocalStrategy;