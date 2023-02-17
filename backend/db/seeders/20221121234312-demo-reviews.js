'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        review: 'Fire',
        stars: 5
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Fire',
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Fire',
        stars: 5
      },
      {
        spotId: 1,
        userId: 1,
        review: 'Fire',
        stars: 5
      },
      {
        spotId: 1,
        userId: 1,
        review: 'Fire',
        stars: 5
      },
      {
        spotId: 1,
        userId: 1,
        review: 'Fire',
        stars: 5
      },
      {
        spotId: 1,
        userId: 1,
        review: 'Fire',
        stars: 5
      },
      {
        spotId: 2,
        userId: 2,
        review: 'Was good',
        stars: 4
      },
      {
        spotId: 3,
        userId: 3,
        review: 'Extravagent',
        stars: 5
      },
      {
        spotId: 4,
        userId: 2,
        review: 'Fire',
        stars: 4
      },
      {
        spotId: 5,
        userId: 1,
        review: 'MID!!!!!!',
        stars: 3
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3,4,5] }
    }, {})
  }
};
