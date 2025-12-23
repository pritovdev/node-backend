const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const sequelize = require('../libs/sequelize');

class OrderService {

  constructor(){

  }
  async create(data) {
    const newOrder = await models.order.create(data);
    return newOrder;
  }

  async find() {
    const orders = await models.order.findAll();
    return orders ;
  }
  
  async findSpecific(data) {
    const orderId = data.orderId;
    const productId = data.productId;
    const quantity = data.quantity;
    const [result] = await sequelize.query(`SELECT product_name AS product, price FROM product WHERE id = ${productId}`);
    const item = result[0];

    const insertData = {
      "orderData": {
        "orderId": orderId,
        "productId": productId,
        "quantity": quantity,
      },
      "productData": {
        "product": item.product,
        "unitPrice": item.price,
      },
      "total": item.price * quantity
    }

    const orderToUpdate = await models.order.findByPk(orderId);
    const currentValue = orderToUpdate.finalPrice;
    const finalPriceUpdate = await orderToUpdate.update({ "finalPrice": currentValue + insertData.total });
    const newItem = await models.order_product.create(insertData.orderData);
  
    return { currentValue, newItem };
  }

  async findOne(id) {
    const order = await models.order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user']
        },
        'items'
      ]
    });
    if (!order) {
      throw boom.notFound('The order was not found');
    }
    return order;
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

  async addItem(data) {
    const orderId = data.orderId;
    const productId = data.productId;
    const quantity = data.quantity;
    const [result] = await sequelize.query(`SELECT product_name AS product, price FROM product WHERE id = ${productId}`);
    const item = result[0];

    const insertData = {
      "orderData": {
        "orderId": orderId,
        "productId": productId,
        "quantity": quantity,
      },
      "productData": {
        "product": item.product,
        "unitPrice": item.price,
      },
      "total": item.price * quantity
    }

    const orderToUpdate = await models.order.findByPk(orderId);
    const currentValue = orderToUpdate.finalPrice;
    const finalPriceUpdate = await orderToUpdate.update({ "finalPrice": currentValue + insertData.total });
    const newItem = await models.order_product.create(insertData.orderData);
  
    return { currentValue, newItem, finalPriceUpdate };   
  }

}

module.exports = OrderService;
