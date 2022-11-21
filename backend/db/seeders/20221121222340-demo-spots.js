'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: 'A Street',
        city: 'Union City',
        state: 'NJ',
        country: 'US',
        lat: 0,
        lng : 0,
        name: '4Bed/4Bath',
        description: 'BSHBDEINDOW',
        price: 300
      },
      {
        ownerId: 2,
        address: 'B street',
        city: 'Union City',
        state: 'CA',
        country: 'US',
        lat: 0,
        lng : 0,
        name: '5Bed/4Bath',
        description: 'anksovnornvr',
        price: 500
      },
      {
        ownerId: 3,
        address: 'C street',
        city: 'Fremont',
        state: 'CA',
        country: 'US',
        lat: 0,
        lng : 0,
        name: '4Bed/2Bath',
        description: 'DnuiNSDiNDWOi',
        price: 600
      },
      {
        ownerId: 1,
        address: 'D street',
        city: 'Fremont',
        state: 'NJ',
        country: 'US',
        lat: 0,
        lng : 0,
        name: '1Bed/1Bath',
        description: 'WDjbdiabdawDW',
        price: 400
      },
      {
        ownerId: 3,
        address: ' E street',
        city: 'San Jose',
        state: 'CA',
        country: 'US',
        lat: 0,
        lng : 0,
        name: '6Bed/4Bath',
        description: 'SHEEEEEEEEEEESH',
        price: 800
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ['6Bed/4Bath', '1Bed/1Bath', '4Bed/2Bath', '5Bed/4Bath', '4Bed/4Bath'] }
    }, {})
  }
};
