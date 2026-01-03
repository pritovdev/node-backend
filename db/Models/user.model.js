const { Model, DataTypes, Sequelize } = require('sequelize');

const USER_TABLE = 'store_user';
const user_schema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true
    },
    password: {
        allowNull: false,
        type: DataTypes.STRING,
    },
    recoveryToken: {
        allowNull: true,
        type: DataTypes.STRING,
        field: "recovery_token",
    },
    role: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'Customer'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    }
}

class User extends Model {
    static associate(models) {
        this.hasOne(models.store_customer, {
            as: 'customer',
            foreignKey: 'userId'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE,
            modelName: 'store_user',
            timestamps: false 
        }
    }
}

module.exports = { USER_TABLE, user_schema, User };