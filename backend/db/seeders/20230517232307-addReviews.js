'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
   await queryInterface.bulkInsert(options, [
    {
      spotId: 1,
      userId: 5,
      review: 'Sitting on this comfortable chair was like sitting on a cloud! Highly recommend!',
      stars: 5,
    },
    {
      spotId: 1,
      userId: 9,
      review: "I had such a wonderful experience on this chair. It's incredibly cozy and perfect for relaxing.",
      stars: 4,
    },
    {
      spotId: 1,
      userId: 7,
      review: 'This chair was so uncomfortable! Sitting on it felt like torture.',
      stars: 1,
    },
    {
      spotId: 2,
      userId: 12,
      review: 'I regretted sitting on this chair. It was the most uncomfortable experience ever.',
      stars: 2,
    },
    {
      spotId: 2,
      userId: 14,
      review: 'This chair is just perfect! The comfort level is unmatched. I could sit on it forever!',
      stars: 5,
    },
    {
      spotId: 3,
      userId: 9,
      review: 'Sitting on this chair made me feel like a king/queen. Absolute luxury and comfort!',
      stars: 5,
    },
    {
      spotId: 4,
      userId: 4,
      review: 'The chair was too hard and gave me back pain. Not recommended at all.',
      stars: 2,
    },
    {
      spotId: 5,
      userId: 12,
      review: "This chair is a true gem! It's like sitting on a throne. Highly satisfied with the comfort.",
      stars: 5,
    },
    {
      spotId: 6,
      userId: 19,
      review: 'This chair exceeded my expectations! It was so comfortable and stylish.',
      stars: 5,
    },
    {
      spotId: 7,
      userId: 13,
      review: 'Sitting on this chair was like sitting on a cloud. I never wanted to get up!',
      stars: 4,
    },
    {
      spotId: 7,
      userId: 5,
      review: 'I had a terrible experience with this chair. It was extremely uncomfortable.',
      stars: 1,
    },
    {
      spotId: 8,
      userId: 17,
      review: 'The chair looked great but was not comfortable at all. Disappointed.',
      stars: 2,
    },
    {
      spotId: 9,
      userId: 10,
      review: 'This chair provided excellent support for my back. Highly recommended!',
      stars: 5,
    },
    {
      spotId: 9,
      userId: 11,
      review: 'I found this chair to be very stylish and perfect for my living room decor.',
      stars: 4,
    },
    {
      spotId: 10,
      userId: 7,
      review: 'The chair was too small and uncomfortable. Not suitable for long sitting sessions.',
      stars: 2,
    },
    {
      spotId: 11,
      userId: 6,
      review: 'This chair was a great addition to my office. It looks professional and feels comfortable.',
      stars: 4,
    },
    {
      spotId: 11,
      userId: 8,
      review: 'I had a fantastic experience on this chair. It provided excellent lumbar support.',
      stars: 5,
    },
    {
      spotId: 13,
      userId: 13,
      review: 'The chair had a unique design and was surprisingly comfortable. I loved it!',
      stars: 4,
    },
    {
      spotId: 13,
      userId: 10,
      review: 'I found this chair to be quite uncomfortable. It didn\'t meet my expectations.',
      stars: 2,
    },
    {
      spotId: 14,
      userId: 5,
      review: 'Sitting on this chair made me feel like royalty. So luxurious and comfortable!',
      stars: 5,
    },
    {
      spotId: 14,
      userId: 6,
      review: 'I loved the design of this chair. It added a touch of elegance to my room.',
      stars: 4,
    },
    {
      spotId: 14,
      userId: 11,
      review: 'The chair was too soft and lacked proper support. Not recommended for long sitting.',
      stars: 2,
    },
    {
      spotId: 15,
      userId: 7,
      review: 'This chair was a game-changer for my workspace. Comfortable and ergonomic!',
      stars: 5,
    },
    {
      spotId: 15,
      userId: 10,
      review: 'I had a pleasant experience on this chair. It provided good back support.',
      stars: 4,
    },
    {
      spotId: 15,
      userId: 5,
      review: 'The chair was too stiff and uncomfortable. I wouldn\'t recommend it.',
      stars: 2,
    },
    {
      spotId: 15,
      userId: 13,
      review: 'This chair was worth every penny. Exceptionally comfortable and well-made.',
      stars: 5,
    },
    {
      spotId: 15,
      userId: 17,
      review: 'I enjoyed sitting on this chair. It added a cozy touch to my reading corner.',
      stars: 4,
    },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    await queryInterface.bulkDelete(options, {});
  }
};
