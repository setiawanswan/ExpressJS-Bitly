'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      firstName: 'Pandu',
      lastname: 'Akas',
      email: 'pandu@gmail.com',
      password:'123456'
    }], {})
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});    
  }
};




/*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */


    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */