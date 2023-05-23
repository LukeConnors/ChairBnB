'use strict';
const bcrypt = require("bcryptjs");

let options = {};

if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
   await queryInterface.bulkInsert(options, [
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Demo',
        lastName: 'User',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johndoe',
        email: 'johndoe@example.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        username: 'janesmith',
        email: 'janesmith@example.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Michael',
        lastName: 'Johnson',
        username: 'mjohnson',
        email: 'mjohnson@example.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Sarah',
        lastName: 'Williams',
        username: 'swilliams',
        email: 'swilliams@example.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'David',
        lastName: 'Davis',
        username: 'ddavis',
        email: 'ddavis@example.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Emma',
        lastName: 'Brown',
        username: 'ebrown',
        email: 'ebrown@example.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'William',
        lastName: 'Wilson',
        username: 'wwilson',
        email: 'wwilson@example.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Olivia',
        lastName: 'Johnson',
        username: 'ojohnson',
        email: 'ojohnson@example.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'James',
        lastName: 'Lee',
        username: 'jlee',
        email: 'jlee@example.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Sophia',
        lastName: 'Anderson',
        username: 'sanderson',
        email: 'sanderson@example.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Daniel',
        lastName: 'Martinez',
        username: 'dmartinez',
        email: 'dmartinez@example.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Isabella',
        lastName: 'Taylor',
        username: 'itaylor',
        email: 'itaylor@example.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Ethan',
        lastName: 'Thomas',
        username: 'ethomas',
        email: 'ethomas@example.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Mia',
        lastName: 'Moore',
        username: 'mmoore',
        email: 'mmoore@example.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Ava',
        lastName: 'Jackson',
        username: 'ajackson',
        email: 'ajackson@example.com',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Noah',
        lastName: 'White',
        username: 'nwhite',
        email: 'nwhite@example.com',
        hashedPassword: bcrypt.hashSync('password')
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    await queryInterface.bulkDelete(options, {});
  }
};
