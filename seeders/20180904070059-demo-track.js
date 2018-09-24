'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tracks', [{
      uuid: 1,
      short_url_id: 1,
      ip_adress: 1,
      referrer_url: 'google.com',
      
    }])
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.bulkDelete('tracks', null, {});
  }
};
