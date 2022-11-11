'use strict';

const { faker } = require('@faker-js/faker');
const { v4: uuid } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    let users = [];
    for (let i = 0; i < 20; i++) {
      users.push({
        name: faker.name.firstName(),
        secondary_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        secondary_last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password:  faker.internet.password(),
        phone_number: faker.phone.number(),
        average_score: 0,
      })
    }

    await queryInterface.bulkInsert('users', users, {});
  },

  async down(queryInterface, Sequelize) {

  }
};
