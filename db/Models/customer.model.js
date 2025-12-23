const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');

const CUSTOMER_TABLE = 'store_customer';
const customer_schema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING
  },
  lastname: {
    allowNull: false,
    type: DataTypes.STRING
  },
  birthdate: {
    allowNull: false,
    type: DataTypes.DATE
  },
  userId: {
    field: 'user_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true,
    references: {
      model: USER_TABLE,
      key: 'id'
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  }
};

class Customer extends Model {
  static associate(models) {
    this.belongsTo(models.store_user, {as: 'user'});
    this.hasMany(models.order, {
      as: 'order',
      foreignKey: 'customerId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CUSTOMER_TABLE,
      modelName: 'store_customer',
      timestamps: false
    }
  }
};

module.exports = { CUSTOMER_TABLE, customer_schema, Customer };