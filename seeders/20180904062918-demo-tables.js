'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Shorts', [{
          title: 'Dantes Inferno',
          short_url: 'google.com',
          url: 'http://www.google.co.id',
          user_id: 1,
          
        }])
      },
    
  

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Shorts', null, {});   
  }
};
