const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');

const ORDER_TABLE = 'store_order';
const order_schema = {
  id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
  customerId: {
    allowNull: false,
    field: 'customer_id',
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL'
  },
  finalPrice: {
    allowNull: false, 
    type: DataTypes.FLOAT,
    field: 'final_price',
    defaultValue: 0
  },
  createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW,
  }
};

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.store_customer, {as: 'customer'});
    this.belongsToMany(models.product, {
      as: 'items',
      through: models.order_product,
      foreignKey: 'orderId',
      otherKey: 'productId'
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'order',
      timestamps: false
    }
  }
};

module.exports = { ORDER_TABLE, Order, order_schema };