'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
   await queryInterface.bulkInsert(options, [
    {
      ownerId: 4,
      address: '123 Main St',
      city: 'Cityville',
      state: 'Stateville',
      country: 'Countryland',
      lat: 123.456,
      lng: 78.901,
      name: 'Old Oak Chair',
      description: 'A beautiful vintage oak chair with intricate carvings.',
      price: 50,
      previewImg: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364030/24-in-old-south-bar-chair-oak-antique_new8og.jpg'
    },
    {
      ownerId: 5,
      address: '456 Elm St',
      city: 'Townsville',
      state: 'Stateville',
      country: 'Countryland',
      lat: 12.345,
      lng: 67.890,
      name: 'Antique Wingback Chair',
      description: 'An elegant wingback chair with floral upholstery.',
      price: 75,
      previewImg:'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364241/download_d4whdr.jpg'
    },
    {
      ownerId: 6,
      address: '789 Pine St',
      city: 'Villagetown',
      state: 'Stateville',
      country: 'Countryland',
      lat: 98.765,
      lng: 54.321,
      name: 'Vintage Rocking Chair',
      description: 'A classic rocking chair made from solid wood.',
      price: 120,
      previewImg: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364278/DSC02103_aqpmxy.webp'
    },
    {
      ownerId: 7,
      address: '321 Oak St',
      city: 'Cityville',
      state: 'Stateville',
      country: 'Countryland',
      lat: 45.678,
      lng: 23.456,
      name: 'Leather Recliner',
      description: 'A comfortable leather recliner perfect for relaxation.',
      price: 200,
      previewImg: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364314/download_iwbkyr.jpg'
    },
    {
      ownerId: 8,
      address: '654 Maple St',
      city: 'Townsville',
      state: 'Stateville',
      country: 'Countryland',
      lat: 78.901,
      lng: 34.567,
      name: 'Mid-Century Armchair',
      description: 'A stylish mid-century armchair with wooden legs.',
      price: 150,
      previewImg: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364350/download_guc1kh.jpg'
    },
    {
      ownerId: 9,
      address: '987 Elm St',
      city: 'Villagetown',
      state: 'Stateville',
      country: 'Countryland',
      lat: 56.789,
      lng: 45.678,
      name: 'Velvet Chaise Lounge',
      description: 'A luxurious velvet chaise lounge for ultimate comfort.',
      price: 300,
      previewImg: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364385/download_fumuco.jpg'
    },
    {
      ownerId: 10,
      address: '147 Pine St',
      city: 'Cityville',
      state: 'Stateville',
      country: 'Countryland',
      lat: 89.012,
      lng: 12.345,
      name: 'Rattan Hanging Chair',
      description: 'A unique rattan hanging chair for a bohemian vibe.',
      price: 80,
      previewImg: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364421/download_gjffnu.jpg'
    },
    {
      ownerId: 11,
      address: '258 Oak St',
      city: 'Townsville',
      state: 'Stateville',
      country: 'Countryland',
      lat: 67.890,
      lng: 98.123,
      name: 'Modern Dining Chair',
      description: 'A sleek and modern dining chair for your dining room.',
      price: 70,
      previewImg: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364453/download_nhhdik.jpg'
    },
    {
      ownerId: 12,
      address: '369 Maple St',
      city: 'Villagetown',
      state: 'Stateville',
      country: 'Countryland',
      lat: 23.456,
      lng: 56.789,
      name: 'Eames Lounge Chair',
      description: 'An iconic Eames lounge',
      price: 300,
      previewImg: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364493/download_dhtyvz.jpg'
    },
    {
      ownerId: 13,
      address: '741 Pine St',
      city: 'Cityville',
      state: 'Stateville',
      country: 'Countryland',
      lat: 34.567,
      lng: 78.901,
      name: 'Cozy Bean Bag Chair',
      description: 'A comfortable and versatile bean bag chair for relaxation.',
      price: 40,
      previewImg: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364543/download_oqzb8w.jpg'
    },
    {
      ownerId: 14,
      address: '852 Oak St',
      city: 'Townsville',
      state: 'Stateville',
      country: 'Countryland',
      lat: 45.678,
      lng: 89.012,
      name: 'Rustic Wooden Bench',
      description: 'A rustic wooden bench with a vintage charm.',
      price: 90,
      previewImg: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364638/download_jnh5ea.jpg'
    },
    {
      ownerId: 15,
      address: '963 Elm St',
      city: 'Villagetown',
      state: 'Stateville',
      country: 'Countryland',
      lat: 56.789,
      lng: 90.123,
      name: 'Plush Armchair',
      description: 'A plush armchair with extra cushioning for comfort.',
      price: 100,
      previewImg: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364575/download_nk9xjq.jpg'
    },
    {
      ownerId: 16,
      address: '123 Cedar St',
      city: 'Cityville',
      state: 'Stateville',
      country: 'Countryland',
      lat: 67.890,
      lng: 12.345,
      name: 'Vintage Writing Desk Chair',
      description: 'A vintage chair that pairs perfectly with a writing desk.',
      price: 60,
      previewImg: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364673/download_sumfmd.jpg'
    },
    {
      ownerId: 4,
      address: '456 Birch St',
      city: 'Townsville',
      state: 'Stateville',
      country: 'Countryland',
      lat: 78.901,
      lng: 23.456,
      name: 'Hammock Chair',
      description: 'A relaxing hammock chair for indoor or outdoor use.',
      price: 80,
      previewImg: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364699/download_xgxm0y.jpg'
    },
    {
      ownerId: 9,
      address: '789 Pine St',
      city: 'Villagetown',
      state: 'Stateville',
      country: 'Countryland',
      lat: 89.012,
      lng: 34.567,
      name: 'Leather Club Chair',
      description: 'A classic leather club chair for a touch of sophistication.',
      price: 150,
      previewImg: 'https://res.cloudinary.com/dyt7uoeck/image/upload/v1684364721/download_mm6mtn.jpg'
    }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    await queryInterface.bulkDelete(options, {});
  }
};
