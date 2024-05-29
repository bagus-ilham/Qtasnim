'use strict';
const fs = require('fs');

const { hashing } = require('../helper');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./data/user.json', "utf-8")).map(item => {
      item.createdAt = item.updatedAt = new Date()
      item.password = hashing(item.password)
      return item
     })
     await queryInterface.bulkInsert('Users', data);

     const data2 = JSON.parse(fs.readFileSync('./data/productType.json', "utf-8")).map(item => {
      item.createdAt = item.updatedAt = new Date()
      return item
     })
     await queryInterface.bulkInsert('ProductTypes', data2);

     const data3 = JSON.parse(fs.readFileSync('./data/product.json', "utf-8")).map(item => {
      item.createdAt = item.updatedAt = new Date()
      return item
     })
     await queryInterface.bulkInsert('Products', data3);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('ProductTypes', null, {});
    await queryInterface.bulkDelete('Products', null, {});

  }
};
