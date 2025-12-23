const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
//const finalPrice = Joi.number();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const quantity = Joi.number().integer().min(1);


const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  //finalPrice: finalPrice.required()
});

const getOrderSchema = Joi.object({
  id: id.required()
});

const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  quantity: quantity.required()
})

module.exports = { createOrderSchema, getOrderSchema, addItemSchema };