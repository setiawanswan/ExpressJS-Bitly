'use strict';
module.exports = (sequelize, DataTypes) => {
  const Shorts = sequelize.define('Shorts', {
    title: DataTypes.STRING,
    short_url: DataTypes.STRING,
    url: DataTypes.STRING,
    user_id: DataTypes.INTEGER,

  }, {});
  Shorts.associate = function(models) {
    // associations can be defined here
    Shorts.belongsTo(models.User,{foreignKey:'user_id'})
    Shorts.hasMany(models.track,{foreignKey:'short_url_id'})
    
  };
  return Shorts;
};