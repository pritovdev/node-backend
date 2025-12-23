const { Model, DataTypes, Sequelize } = require('sequelize');

const CATEGORY_TABLE = 'category';
const category_schema = {
  id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
  },
  categoryName: {
      allowNull: false,
      type: DataTypes.STRING,
      field: 'category_name'
  },
  createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: Sequelize.NOW,
  }
};

class Category extends Model {
  static associate(models) {
    this.hasMany(models.product, {
      as: 'product',
      key: 'CategoryId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: CATEGORY_TABLE,
      modelName: 'category',
      timestamps: false
    }
  }
};

module.exports = { CATEGORY_TABLE, category_schema, Category};