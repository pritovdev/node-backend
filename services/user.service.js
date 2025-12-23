const boom = require('@hapi/boom');
const { models }= require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.store_user.create(data);
    return newUser;
  }

  async findAll() {
    const storeUsers = await models.store_user.findAll({
      include: ['customer']
    });
    return storeUsers;
  }

  async findOne(id) {
    const user = await models.store_user.findByPk(id, {
        include: ['customer']
      }
    )
    if (!user) {
      throw boom.notFound('User not found')
    }
    return user;
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    const res = await user.update(changes);
    return res;
  }
  
  async delete(id) {
    const user = await this.findOne(id)
    await user.destroy(id)
    return { id };
  }
}

module.exports = UserService;
