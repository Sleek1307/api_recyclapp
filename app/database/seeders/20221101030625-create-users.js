'use strict';

const { faker } = require('@faker-js/faker');
const { v4: uuid } = require('uuid');
const { generateRandomNumber } = require('../../helpers');
const {Address} = require('../db.js')

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('roles', [{ role_name: 'ADMIN' }, { role_name: 'RECOLECTOR' }, { role_name: 'ORIGEN' }], {})

    let users = [];
    for (let i = 0; i < 20; i++) {
      users.push({
        id: uuid(),
        name: faker.name.firstName(),
        secondary_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        secondary_last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        phone_number: faker.phone.number(),
        average_score: 0,
        state: true,
        role_id: generateRandomNumber(1, 4),
      })
    }

    await queryInterface.bulkInsert('users', users, {});

    let roads = ['Calle', 'Carrera']
    for (let i = 0; i < 20; i++) {
      const address = {
        road: roads[generateRandomNumber(1, 3)],
        streetNumber: faker.address.streetName(),
        houseNumber: faker.address.streetAddress(),
        coordinates: {
          "type": "Point",
          "coordinates": [
            faker.address.longitude,
            faker.address.latitude
          ]
        },
        userId: users[i].id,
      }

      await Address.create(address)
    }
  },

  async down(queryInterface, Sequelize) {

  }
};
