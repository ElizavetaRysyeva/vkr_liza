module.exports = (sequelize, Sequelize) => {
  const Model = sequelize.define("order", {
    user_id: {
      type: Sequelize.INTEGER,
      references: sequelize.users,
    },
    room_id: {
      type: Sequelize.INTEGER,
      references: sequelize.rooms,
    },
    hotel_id: {
      type: Sequelize.INTEGER,
      references: sequelize.hotels,
    },
    status: {
      type: Sequelize.INTEGER,
    },
    status_name: {
      type: Sequelize.STRING,
    },
    cluster: {
      type: Sequelize.INTEGER,
    },
  });

  Model.statusEnum = [
    { val: 1, name: "В корзине" },
    { val: 2, name: "Оплачен" },
  ];

  return Model;
};
