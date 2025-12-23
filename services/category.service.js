const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CategoryService {

  constructor(){
  }
  async create(data) {
    const newCategory = await models.category.create(data);
    return newCategory;
  }

  async find() {
    const categories = models.category.findAll();
    return categories;
  }

  async findOne(id) {
    const category = models.category.findByPk(id, {
      include: ['product']
    });
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const update = await category.update(changes)
    return update;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy(id);
    return { id };
  }

}

module.exports = CategoryService;
