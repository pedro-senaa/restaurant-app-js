'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const menuData = await queryInterface.sequelize.query(
      `SELECT id FROM "Menu";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const orderData = await queryInterface.sequelize.query(
      `SELECT id FROM "Order";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const orderItemsData = [
      {
        orderId: orderData[0].id,
        menuId: menuData[0].id,
        quantity: 3
      },
      {
        orderId: orderData[1].id,
        menuId: menuData[1].id,
        quantity: 1,
      },
      {
        orderId: orderData[1].id,
        menuId: menuData[0].id,
        quantity: 2,
      }
    ]

    const validOrderItem = orderItemsData.filter(orderItem => orderItem.orderId && orderItem.menuId);

    if (validOrderItem.length > 0) {
      await queryInterface.bulkInsert('OrderItems', validOrderItem);
    } else {
      console.warn('No valid OrderItems')
    }



  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('OrderItems', null, {});
  }
};
