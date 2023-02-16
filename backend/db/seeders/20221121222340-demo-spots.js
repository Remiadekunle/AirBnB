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
        lat: 37.432327703072986,
        lng : -122.16962725661375,
        beds: 4,
        baths: 4,
        guests: 5,
        name: 'Nice townhouse in the suburbs',
        description: 'BSHBDEINDOW',
        price: 300,
        isTrendy: true
      },
      {
        ownerId: 2,
        address: 'B street',
        city: 'Union City',
        state: 'CA',
        country: 'US',
        lat: 37.51202741927217,
        beds: 5,
        baths: 4,
        guests: 7,
        lng : -122.26112276992751,
        name: 'Nice townhouse in the suburbs',
        description: 'anksovnornvr',
        price: 500,
        isTrendy: true
      },
      {
        ownerId: 3,
        address: 'C street',
        city: 'Fremont',
        state: 'CA',
        country: 'US',
        lat: 37.5719164889327,
        lng : -122.01204211397605,
        beds: 4,
        baths: 2,
        guests: 4,
        name: 'Nice townhouse in the suburbs',
        description: 'DnuiNSDiNDWOi',
        price: 600,
        isTrendy: false
      },
      {
        ownerId: 1,
        address: 'D street',
        city: 'Fremont',
        state: 'NJ',
        country: 'US',
        lat: 37.54606120139952,
        lng : -121.98886782881985,
        beds: 1,
        baths: 1,
        guests: 2,
        name: 'Nice townhouse in the suburbs',
        description: 'WDjbdiabdawDW',
        price: 400,
        isTrendy: false
      },
      {
        ownerId: 3,
        address: ' E street',
        city: 'San Jose',
        state: 'CA',
        country: 'US',
        lat: 37.526595778790394,
        lng : -122.0029440612851,
        beds: 6,
        guests: 9,
        baths: 4,
        name: 'Nice townhouse in the suburbs',
        description: 'SHEEEEEEEEEEESH',
        price: 800,
        isTrendy: true
      },
      {
        ownerId: 1,
        address: 'A Street',
        city: 'Union City',
        state: 'NJ',
        country: 'US',
        lat: 37.54483625470634,
        lng : -121.96208865486156,
        beds: 4,
        baths: 2,
        guests: 6,
        name: 'Nice townhouse in the suburbs',
        description: 'BSHBDEINDOW',
        price: 300,
        isTrendy: false
      },
      {
        ownerId: 2,
        address: 'B street',
        city: 'Union City',
        state: 'CA',
        country: 'US',
        lat: 37.53421920691258,
        lng : -121.99985415659758,
        beds: 5,
        baths: 3,
        guests: 5,
        name: 'Nice townhouse in the suburbs',
        description: 'anksovnornvr',
        price: 500,
        isTrendy: true
      },
      {
        ownerId: 3,
        address: 'C street',
        city: 'Fremont',
        state: 'CA',
        country: 'US',
        lat: 37.57477362796726,
        lng : -122.0379629810767,
        beds: 6,
        baths: 4,
        guests: 8,
        name: 'Nice townhouse in the suburbs',
        description: 'DnuiNSDiNDWOi',
        price: 600,
        isTrendy: false
      },
      {
        ownerId: 1,
        address: 'D street',
        city: 'Fremont',
        state: 'NJ',
        country: 'US',
        lat: 37.589329729390926,
        lng : -122.04929263159752,
        beds: 3,
        baths: 2,
        guests: 3,
        name: 'Nice townhouse in the suburbs',
        description: 'WDjbdiabdawDW',
        price: 400,
        isTrendy: true
      },
      {
        ownerId: 3,
        address: ' E street',
        city: 'San Jose',
        state: 'CA',
        country: 'US',
        lat: 37.53428726955342,
        lng : -122.0010557862146,
        beds: 7,
        baths: 5,
        guests: 10,
        name: 'Nice townhouse in the suburbs',
        description: 'SHEEEEEEEEEEESH',
        price: 800,
        isTrendy: false
      },
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
