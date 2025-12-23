const { Model, DataTypes, Sequelize } = require('sequelize');
const { CATEGORY_TABLE } = require('./category.model');

const PRODUCT_TABLE = 'product';
const product_schema = {
  id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
  productName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      field: 'product_name'
  },
  description: {
      allowNull: false,
      type: DataTypes.TEXT,
  },
  categoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      field:  'category_id',
      references: {
        model: CATEGORY_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
  },
  price: {
    allowNull: false,
    type: DataTypes.FLOAT
  },
  createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW,
  }
}

class Product extends Model {
  static associate(models) {
    this.belongsTo(models.category, {
      as: 'category'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCT_TABLE,
      modelName: 'product',
      timestamps:false
    }
  }
}

module.exports = { PRODUCT_TABLE, Product, product_schema };