'use strict';

// let short = require('./shorts');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  },
   {});
  
  
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Shorts,{foreignKey:'user_id'})
  
  };

  
  
  return User;
};