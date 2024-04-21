module.exports = (sequelize, Sequelize) => {
  const Model = sequelize.define("hotel", {
    hotelId: {
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    country: {
      type: Sequelize.STRING,
    },
    zipCode: {
      type: Sequelize.INTEGER,
    },
    propertyType: {
      type: Sequelize.STRING,
    },
    stars: {
      type: Sequelize.STRING,
    },
    latitude: {
      type: Sequelize.INTEGER,
    },
    longitude: {
      type: Sequelize.INTEGER,
    },
    source: {
      type: Sequelize.INTEGER,
    },
    url: {
      type: Sequelize.STRING,
    },
    curr: {
      type: Sequelize.STRING,
    },
    hotelCode: {
      type: Sequelize.INTEGER,
    },
    image: {
      type: Sequelize.STRING,
    },
  });

  return Model;
};
