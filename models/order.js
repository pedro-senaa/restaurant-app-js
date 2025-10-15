'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Tab, {
        foreignKey: 'tabId',
        as: 'Tab'
      })

      Order.hasMany(models.OrderItems, {
        foreignKey: 'orderId',
        as: 'OrderItems',
      })
    }
  }
  Order.init({
    tabId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Tab',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    }
  }, {
    sequelize,
    modelName: 'Order',
    freezeTableName: true,
  });

  return Order;
};