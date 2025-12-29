const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');

class CustomerService {
  constructor() {

  }

  async find() {
    const res = await models.store_customer.findAll({
      include: ['user']
    });
    return res;
  }

  async create(data) {
    const hashed = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hashed
      }
    };
    const newCustomer = await models.store_customer.create(newData, {
      include: ['user']
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async findOne(id) {
    const customer = await models.store_customer.findByPk(id, {
      include: ['user']
    })
    if (!customer) {
      throw boom.notFound('User not found')
    }
    return customer;
  }

  async update(id, data) {
    const customer = await this.findOne(id);
    const res = await customer.update(data);
    return res;
  }

}

module.exports = CustomerService;