'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('Menu', [
      {
        name: 'PF de frango',
        price: 2500,
        description: 'Um prato feito de frango', 
        isFood: true,
        isDrink: false,

      },
      {
        name: 'Coca',
        price: 350,
        isFood: false,
        isDrink: true,
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('Menu', null, {});
  }
};
