'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.bulkInsert('users', [
      {
        name: 'Admin',
        email: 'admin@admin.com.br',
        password: 'admin123',
        createdAt: Sequelize.literal('CURRENT_TIMESTAMP'),
        updatedAt: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    ]);
  },

  async down (queryInterface, _Sequelize) {
    queryInterface.bulkDelete('users', null, {});
  }
};
