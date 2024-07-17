'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const user = await queryInterface.rawSelect('Users', {
      where: {
        username: 'user@example.com',
      },
    }, ['id']);
    return user ? null : queryInterface.bulkInsert('Users', [
      {
        username: 'user@example.com',
        password: '$2a$10$.s6MWqIqOWjhJaj0EtVqeeWC1vqSuM0h/g9K.hUU5IrAzXnTdl54i',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
