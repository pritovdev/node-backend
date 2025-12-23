const { User, user_schema } = require('./user.model');
const { Product, product_schema } = require('./products.model');
const { Category, category_schema } = require('./category.model');
const { Order, order_schema } = require('./order.model');
const { Customer, customer_schema } = require('./customer.model');
const { OrderProduct, orderProductSchema } = require('./orderProduct.model');

function setupModels(sequelize) {
  User.init(user_schema, User.config(sequelize));
  Product.init(product_schema, Product.config(sequelize));
  Category.init(category_schema, Category.config(sequelize));
  Order.init(order_schema, Order.config(sequelize));
  Customer.init(customer_schema, Customer.config(sequelize));
  OrderProduct.init(orderProductSchema, OrderProduct.config(sequelize));

  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
  OrderProduct.associate(sequelize.models);
}

module.exports = setupModels;