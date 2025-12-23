const { Model, DataTypes, Sequelize } = require('sequelize');
const { PRODUCT_TABLE } = require('./products.model');
const { ORDER_TABLE } = require('./order.model');

const ORDER_PRODUCT_TABLE = 'order_product';
const orderProductSchema = {
  id: {
    allowNull: false, 
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true
  },
  productId: {
    allowNull: false,
    field: 'product_id',
    type: DataTypes.INTEGER,
    references: {
      model: PRODUCT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  orderId: {
    allowNull: false,
    field: 'order_id',
    type: DataTypes.INTEGER,
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  quantity: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNul: false,
    field: 'created_at',
    type: DataTypes.DATE,
    defaultValue: Sequelize.NOW
  }
};

class OrderProduct extends Model {
  static associate() {

  }

  static config(sequelize){
    return {
      sequelize,
      tableName: ORDER_PRODUCT_TABLE,
      modelName: 'order_product',
      timestamps: false
    }
  }
};

module.exports = { ORDER_PRODUCT_TABLE, orderProductSchema, OrderProduct };