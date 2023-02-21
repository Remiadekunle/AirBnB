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
        spotId: 5,
        userId: 3,
        review: 'Extravagent',
        stars: 5
      },
      {
        spotId: 6,
        userId: 3,
        review: 'Extravagent',
        stars: 4
      },
      {
        spotId: 7,
        userId: 3,
        review: 'Extravagently mid',
        stars: 3
      },
      {
        spotId: 8,
        userId: 3,
        review: 'Extravagent',
        stars: 4
      },
      {
        spotId: 9,
        userId: 3,
        review: 'Extravagent',
        stars: 5
      },
      {
        spotId: 10,
        userId: 3,
        review: 'Extravagent',
        stars: 3
      },
      {
        spotId: 11,
        userId: 3,
        review: 'Extravagent',
        stars: 5
      },
      {
        spotId: 12,
        userId: 3,
        review: 'Extravagent',
        stars: 4
      },
      {
        spotId: 13,
        userId: 3,
        review: 'Extravagent',
        stars: 4
      },
      {
        spotId: 14,
        userId: 3,
        review: 'Extravagent',
        stars: 5
      },
      {
        spotId: 15,
        userId: 3,
        review: 'Extravagently mid',
        stars: 3
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
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20] }
    }, {})
  }
};
