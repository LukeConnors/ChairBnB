'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Images';
   await queryInterface.bulkInsert(options, [
    {
      imageableId: 1,
      imageableType: 'Spot',
      url: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364030/24-in-old-south-bar-chair-oak-antique_new8og.jpg',
    },
    {
      imageableId: 2,
      imageableType: 'Spot',
      url: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364241/download_d4whdr.jpg',
    },
    {
      imageableId: 3,
      imageableType: 'Spot',
      url: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364278/DSC02103_aqpmxy.webp',
    },
    {
      imageableId: 4,
      imageableType: 'Spot',
      url: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364314/download_iwbkyr.jpg',
    },
    {
      imageableId: 5,
      imageableType: 'Spot',
      url: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364350/download_guc1kh.jpg',
    },
    {
      imageableId: 6,
      imageableType: 'Spot',
      url: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364385/download_fumuco.jpg',
    },
    {
      imageableId: 7,
      imageableType: 'Spot',
      url: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364421/download_gjffnu.jpg',
    },
    {
      imageableId: 8,
      imageableType: 'Spot',
      url: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364453/download_nhhdik.jpg',
    },
    {
      imageableId: 9,
      imageableType: 'Spot',
      url: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364493/download_dhtyvz.jpg',
    },
    {
      imageableId: 10,
      imageableType: 'Spot',
      url: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364543/download_oqzb8w.jpg',
    },
    {
      imageableId: 11,
      imageableType: 'Spot',
      url: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364638/download_jnh5ea.jpg',
    },
    {
      imageableId: 12,
      imageableType: 'Spot',
      url: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364575/download_nk9xjq.jpg',
    },
    {
      imageableId: 13,
      imageableType: 'Spot',
      url: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364673/download_sumfmd.jpg',
    },
    {
      imageableId: 14,
      imageableType: 'Spot',
      url: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364699/download_xgxm0y.jpg',
    },
    {
      imageableId: 15,
      imageableType: 'Spot',
      url: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364721/download_mm6mtn.jpg',
    },
    {
      imageableId: 1,
      imageableType: 'Review',
      url: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684369541/Old-South-Side-Chair-14683_gherzo.jpg'
    },
    {
      imageableId: 4,
      imageableType: 'Review',
      url: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684369775/TM-Torture_chair_mrme4f.jpg'
    },
    {
      imageableId: 12,
      imageableType: 'Review',
      url: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684369835/download_ng2sp6.jpg'
    },
    {
      imageableId: 2,
      imageableType: 'Review',
      url: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684369954/download_yb9xqd.jpg'
    },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Images';
    await queryInterface.bulkDelete(options, {});
  }
};
