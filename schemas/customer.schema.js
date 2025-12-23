const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const lastname = Joi.string().min(3).max(30);
const birthdate = Joi.date();
const userId = Joi.number().integer();
const email = Joi.string();
const password = Joi.string();
const role = Joi.string();

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastname: lastname.required(),
  birthdate: birthdate.required(),
  user: Joi.object({
    email: email.required(),
    password: password.required(),
    role: role
  })
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastname: lastname,
  birthdate: birthdate,
  userId: userId
});

const getCustomerSchema = Joi.object({
  id: id.required()
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };