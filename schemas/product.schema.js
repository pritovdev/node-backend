const Joi = require('joi');

const id = Joi.number().integer();
const productName = Joi.string().min(3).max(25);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
//const image = Joi.string().uri();
const categoryId = Joi.number().integer();
const categoryName = Joi.string().min(3).max(25);

const limit = Joi.number().integer();
const offset = Joi.number().integer();
const max_price = Joi.number().integer();
const min_price = Joi.number().integer();

const createProductSchema = Joi.object({
  productName: productName.required(),
  price: price.required(),
  //image: image.required(),
  description: description.required(),
  categoryId: categoryId.required()
  
});

const updateProductSchema = Joi.object({
  productName: productName,
  price: price,
  //image: image,
  description: description
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryParamenters = Joi.object({
  limit,
  offset,
  price,
  min_price,
  max_price: max_price.when('min_price', {
    is: min_price + 100,
    then: Joi.required()
  }) 
})

module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryParamenters };
