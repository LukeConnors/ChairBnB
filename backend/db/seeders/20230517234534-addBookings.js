'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 7,
      startDate: '2023-05-18',
      endDate: '2023-05-20',
    },
    {
      spotId: 2,
      userId: 9,
      startDate: '2023-05-22',
      endDate: '2023-05-25',
    },
    {
      spotId: 4,
      userId: 12,
      startDate: '2023-06-01',
      endDate: '2023-06-05',
    },
    {
      spotId: 6,
      userId: 14,
      startDate: '2023-06-10',
      endDate: '2023-06-15',
    },
    {
      spotId: 8,
      userId: 13,
      startDate: '2023-06-20',
      endDate: '2023-06-25',
    },
    {
      spotId: 3,
      userId: 19,
      startDate: '2023-05-22',
      endDate: '2023-05-25',
    },
    {
      spotId: 6,
      userId: 12,
      startDate: '2023-06-05',
      endDate: '2023-06-10',
    },
    {
      spotId: 4,
      userId: 16,
      startDate: '2023-06-15',
      endDate: '2023-06-20',
    },
    {
      spotId: 12,
      userId: 5,
      startDate: '2023-06-25',
      endDate: '2023-06-30',
    },
    {
      spotId: 14,
      userId: 8,
      startDate: '2023-07-05',
      endDate: '2023-07-10',
    },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    await queryInterface.bulkDelete(options, {});
  }
};
