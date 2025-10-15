'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    // 
    const tabData = await queryInterface.sequelize.query(
      `SELECT id, status FROM "Tab";`,
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );

    const orderData = [
      { tabId: tabData[0].id },
      { tabId: tabData[1].id }
    ];

    const validOrder = orderData.filter(order => order.tabId);

    if (validOrder.length > 0) {
      await queryInterface.bulkInsert('Order', validOrder)
    } else {
      console.warn('No valid order because no tabData was found')
    }

  }


  ,

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
