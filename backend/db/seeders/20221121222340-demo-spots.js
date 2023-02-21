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
        city: 'Sonoma',
        state: 'CA',
        country: 'US',
        lat: 38.27087938543158,
        lng : -122.5122602711033,
        beds: 4,
        baths: 4,
        guests: 5,
        name: 'Zen House on 15 acres',
        description: 'A tranquil contemplative nature retreat, in a magnificent setting surrounded by a creek, meadow and woodlands. You’ll love this place because of the light, the comfy beds and the location.',
        price: 500,
        isTrendy: true,
        formattedAddres: 'Sonoma, CA, USA',
      },
      {
        ownerId: 2,
        address: 'B street',
        city: 'San Rafael',
        state: 'CA',
        country: 'US',
        lat: 37.94731492234289,
        beds: 5,
        baths: 4,
        guests: 7,
        lng : -122.55590808717055,
        name: 'Nice View Villa - Alpine Falls',
        description: 'Come enjoy the beauty, privacy and seclusion of our home at Alpine Falls Ranch, adjacent to the LoLo National Forest and steps away from the Clark Fork river. ',
        price: 1000,
        isTrendy: true,
        formattedAddres: 'San Rafael, CA, USA'
      },
      {
        ownerId: 3,
        address: 'C street',
        city: 'Oakland',
        state: 'CA',
        country: 'US',
        lat: 37.795546260703766,
        lng : -122.18786610294735,
        beds: 4,
        baths: 2,
        guests: 4,
        name: 'The Cobb Haus',
        description: 'We are located in the quiet neighborhood of Oakland, CA. With lots of activities right outside the door, you\'ll have plenty to do but this is also the perfect retreat to stay in and relax!',
        price: 600,
        isTrendy: false,
        formattedAddres: 'Oakland, CA, USA'
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
        isTrendy: true,
        formattedAddres: 'D Street, San Jose, NJ, USA'
      },
      {
        ownerId: 3,
        address: ' E street',
        city: 'San Jose',
        state: 'CA',
        country: 'US',
        lat: 37.795546260703766,
        lng : -122.18786610294735,
        beds: 6,
        guests: 9,
        baths: 4,
        name: 'Nice townhouse in the suburbs',
        description: 'SHEEEEEEEEEEESH',
        price: 800,
        isTrendy: true,
        formattedAddres: 'D Street, San Jose, CA, USA'
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
        isTrendy: false,
        formattedAddres: 'A Street, Union City, NJ, USA'
      },
      {
        ownerId: 2,
        address: 'B street',
        city: 'Union City',
        state: 'CA',
        country: 'US',
        lat: 37.795546260703766,
        lng : -122.18786610294735,
        beds: 5,
        baths: 3,
        guests: 5,
        name: 'Nice townhouse in the suburbs',
        description: 'anksovnornvr',
        price: 500,
        isTrendy: true,
        formattedAddres: 'B Street, Union City, CA, USA'
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
        isTrendy: false,
        formattedAddres: 'C Street, Union City, CA, USA'
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
        isTrendy: true,
        formattedAddres: 'D Street, Fremont, NJ, USA'
      },
      {
        ownerId: 3,
        address: ' E street',
        city: 'San Jose',
        state: 'CA',
        country: 'US',
        lat: 37.795546260703766,
        lng : -122.18786610294735,
        beds: 7,
        baths: 5,
        guests: 10,
        name: 'Nice townhouse in the suburbs',
        description: 'SHEEEEEEEEEEESH',
        price: 800,
        isTrendy: false,
        formattedAddres: 'E Street, San Jose, CA, USA'
      },
      {
        ownerId: 3,
        address: ' E street',
        city: 'San Jose',
        state: 'CA',
        country: 'US',
        lat: 38.27087938543158,
        lng : -122.5122602711033,
        beds: 7,
        baths: 5,
        guests: 10,
        name: 'Nice townhouse in the suburbs',
        description: 'SHEEEEEEEEEEESH',
        price: 800,
        isTrendy: true,
        formattedAddres: 'E Street, San Jose, CA, USA'
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
        isTrendy: false,
        formattedAddres: 'E Street, San Jose, CA, USA'
      },
      {
        ownerId: 3,
        address: ' E street',
        city: 'San Jose',
        state: 'CA',
        country: 'US',
        lat: 38.27087938543158,
        lng : -122.5122602711033,
        beds: 7,
        baths: 5,
        guests: 10,
        name: 'Nice townhouse in the suburbs',
        description: 'SHEEEEEEEEEEESH',
        price: 800,
        isTrendy: false,
        formattedAddres: 'E Street, San Jose, CA, USA'
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
        isTrendy: false,
        formattedAddres: 'E Street, San Jose, CA, USA'
      },
      {
        ownerId: 3,
        address: ' E street',
        city: 'San Jose',
        state: 'CA',
        country: 'US',
        lat: 38.27087938543158,
        lng : -122.5122602711033,
        beds: 7,
        baths: 5,
        guests: 10,
        name: 'Nice townhouse in the suburbs',
        description: 'SHEEEEEEEEEEESH',
        price: 800,
        isTrendy: true,
        formattedAddres: 'E Street, San Jose, CA, USA'
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
        isTrendy: true,
        formattedAddres: 'E Street, San Jose, CA, USA'
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
        isTrendy: false,
        formattedAddres: 'E Street, San Jose, CA, USA'
      },
      {
        ownerId: 3,
        address: ' E street',
        city: 'San Jose',
        state: 'CA',
        country: 'US',
        lat: 38.27087938543158,
        lng : -122.5122602711033,
        beds: 7,
        baths: 5,
        guests: 10,
        name: 'Nice townhouse in the suburbs',
        description: 'SHEEEEEEEEEEESH',
        price: 800,
        isTrendy: false,
        formattedAddres: 'E Street, San Jose, CA, USA'
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
        isTrendy: true,
        formattedAddres: 'E Street, San Jose, CA, USA'
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
        isTrendy: true,
        formattedAddres: 'E Street, San Jose, CA, USA'
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
