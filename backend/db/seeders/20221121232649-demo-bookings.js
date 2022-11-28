'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 1,
        startDate: new Date(2022, 11, 22),
        endDate: new Date(2022, 12, 1)
      },
      {
        spotId: 2,
        userId: 1,
        startDate: new Date(2022, 11, 22),
        endDate: new Date(2022, 12, 2)
      },
      {
        spotId: 5,
        userId: 2,
        startDate: new Date(),
        endDate: new Date(2022, 12, 3)
      },
      {
        spotId: 4,
        userId: 2,
        startDate: new Date(2024, 12, 22),
        endDate: new Date(2024, 12, 25)
      },
      {
        spotId: 3,
        userId: 3,
        startDate: new Date(2022, 11, 22),
        endDate: new Date(2022, 12, 5)
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5] }
    }, {})
  }
};
