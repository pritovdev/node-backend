const UserService = require('./user.service');
const service = new UserService();
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { config } = require('../config/config');
const nodemailer = require('nodemailer');

class AuthService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    delete user.dataValues.createdAt;
    return user
  }

  async signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role
    };
    const token = jwt.sign(payload, config.jwtSecret)

    return { user, token }
  }

  async sendRecoveryMail(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `http://my-frontend.com/recovery?token=${token}`;

    await service.update(user.id, { recoveryToken: token })

    const mail = {
      from: "sebasprietotovar@hotmail.com",
      to: `${user.email}`,
      subject: "Password Recovery",
      html: `<b>Ingresa al siguiente link para recuperar la contraseña => ${link}</b>`,
    }
    const res = await this.sendMail(mail);
    return { message: "email sent. Check your inbox"}
  }

  async sendMail(mailInfo) {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      secure: true,
      port: 465,
      auth: {
        user: config.gmailMail,
        pass: config.gmailPwd
      }
    });
    await transporter.sendMail(mailInfo);
    return { message: "the email was sent, check your inbox" }
  }

  async changePassword(token, newPassword) {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const user = await service.findOne(payload.sub);
      if (user.recoveryToken !== token) {
        throw boom.unauthorized();
      };

      const hash = await bcrypt.hash(newPassword, 10);
      await service.update(user.id, {
        recoveryToken: null,
        password: hash,
      });
      return { message: 'Your password has been updated' };
    } catch (err) {
      throw boom.unauthorized();
    }
  }
}

module.exports = AuthService;