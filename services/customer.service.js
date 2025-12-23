const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

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
    const newCustomer = await models.store_customer.create(data, {
      include: ['user']
    });
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