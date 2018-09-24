'use strict';
module.exports = (sequelize, DataTypes) => {
  const track = sequelize.define('track', {
    uuid: DataTypes.INTEGER,
    short_url_id: DataTypes.INTEGER,
    ip_adress: DataTypes.STRING,
    referrer_url: DataTypes.STRING,
  }, {});
  track.associate = function(models) {
    
    // associations can be defined here
    track.belongsTo(models.Shorts,{foreignKey:'short_url_id'})
  };
  return track;
};