'use strict';

/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-17109396/original/efed6d5f-9f37-4d4a-be0c-739bcfe83ba5.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-582573931021615910/original/5e56aff5-969c-4994-aab5-fc0d6b8a2b33.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/ee56164a-8b3e-413f-a8a5-24db52c9f0ba.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47354666/original/b92fc905-70ea-449a-aa95-c79ade3ceadb.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-48225744/original/310a27fd-a714-4e89-bcb3-a55b20f68c85.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg?auto=compress&cs=tinysrgb&w=600',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=600',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://images.pexels.com/photos/2710554/pexels-photo-2710554.jpeg?auto=compress&cs=tinysrgb&w=600',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://images.pexels.com/photos/2962739/pexels-photo-2962739.jpeg?auto=compress&cs=tinysrgb&w=600',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://images.pexels.com/photos/4526153/pexels-photo-4526153.jpeg?auto=compress&cs=tinysrgb&w=600',
        preview: true
      },
      {
        spotId: 11,
        url: 'https://images.pexels.com/photos/343240/pexels-photo-343240.jpeg?auto=compress&cs=tinysrgb&w=600',
        preview: true
      },
      {
        spotId: 12,
        url: 'https://images.pexels.com/photos/2360673/pexels-photo-2360673.jpeg?auto=compress&cs=tinysrgb&w=600',
        preview: true
      },
      {
        spotId: 13,
        url: 'https://images.pexels.com/photos/1974596/pexels-photo-1974596.jpeg?auto=compress&cs=tinysrgb&w=600',
        preview: true
      },
      {
        spotId: 14,
        url: 'https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg?auto=compress&cs=tinysrgb&w=600',
        preview: true
      },
      {
        spotId: 15,
        url: 'https://images.pexels.com/photos/2351649/pexels-photo-2351649.jpeg?auto=compress&cs=tinysrgb&w=600',
        preview: true
      },
      {
        spotId: 16,
        url: 'https://images.pexels.com/photos/2189666/pexels-photo-2189666.jpeg?auto=compress&cs=tinysrgb&w=600',
        preview: true
      },
      {
        spotId: 17,
        url: 'https://images.pexels.com/photos/1102402/pexels-photo-1102402.jpeg?auto=compress&cs=tinysrgb&w=600',
        preview: true
      },
      {
        spotId: 18,
        url: 'https://images.pexels.com/photos/1795508/pexels-photo-1795508.jpeg?auto=compress&cs=tinysrgb&w=600',
        preview: true
      },
      {
        spotId: 19,
        url: 'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=600',
        preview: true
      },
      {
        spotId: 20,
        url: 'https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg?auto=compress&cs=tinysrgb&w=600',
        preview: true
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1,2,3,4,5] }
    }, {})
  }
};
