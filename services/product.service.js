const boom = require('@hapi/boom');
const { models }= require('../libs/sequelize');
const { Op } = require('sequelize');

class ProductsService {

  constructor(){
    this.products = [];
    this.generate();
  }

  generate() {}

  async create(data) {
    const newProduct = await models.product.create(data)
    return newProduct;
  }

  async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }

    const { limit, offset, price, min_price, max_price } = query
    if (limit) {
      options.limit = limit
    }
    if (offset) {
      options.offset = offset
    }
    if (price) {
      options.where.price = price
    }
    if (min_price && max_price) {
      options.where.price = {
        [Op.gte]: min_price,
        [Op.lte]: max_price
      }
    }

    const res = models.product.findAll(options);
    return res;
  }

  async findOne(id) {
    const product = await models.product.findByPk(id, {
      include: ['category']
    });
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    }
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    const updatedData = await product.update(changes);
    return updatedData;
  }
  
  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }

}

module.exports = ProductsService;
